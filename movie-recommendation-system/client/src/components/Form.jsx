import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { languages } from "../config/languages";
import { regions } from "../config/regions";
import { genres } from "../config/genre";
import { trending } from "../config/trending";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRecommendation } from "../features/recommendationsSlice";
import { setClassnames, setStartnow } from "../features/firstloadSlice";
import { Box, Collapse, FormControl, ImageList, ImageListItem, InputLabel, MenuItem, Select, Typography, useMediaQuery } from "@mui/material";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import axios from "axios";
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Form() {
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    control,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classnames = useSelector((state) => state.firstload.classnames);
  const start = useSelector((state) => state.firstload.startnow);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formGenres, setFormGenres] = useState([]);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setTimeout(() => dispatch(setClassnames({ background: "", form: "form-final-opacity" })), 2200);
  }, []);

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormGenres(typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const currentYear = new Date().getFullYear();
    switch (data.dateRange) {
      case "last3years":
        data.startYear = `${currentYear - 3}-01-01`;
        break;
      case "last5years":
        data.startYear = `${currentYear - 5}-01-01`;
        break;
      case "last10years":
        data.startYear = `${currentYear - 10}-01-01`;
        break;
      case "nopreference":
        data.startYear = "";
        break;
      default:
        break;
    }

    const baseUrl =
      "https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc";
    const language =
      data["language"] !== "all"
        ? "&with_original_language=" + data["language"]
        : "";
    const region =
      data["region"] !== "all" ? "&with_origin_country=" + data["region"] : "";
    const releaseAfter =
      data["startYear"] !== ""
        ? "&primary_release_date.gte=" + data["startYear"]
        : "";

    const urlNoGenre = baseUrl + language + region + releaseAfter;
    const urls = formGenres[0] === "all"
      ? [urlNoGenre]
      : formGenres.map(genreID => urlNoGenre + "&with_genres=" + genreID);
    if (formGenres.length > 1) {
      urls.push(urlNoGenre + "&with_genres=" + formGenres.join(","))
    }

    try {
      const responses = await Promise.all(urls.map(url => axios.request({
        method: "GET",
        url: url,
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TMDB_BEARER_KEY,
        },
      })))

      const movies = responses.map(response => response.data["results"]).flat();
      const uniqueMovies = []
      const movieIds = new Set()
      movies.forEach(movie => {
        if (!movieIds.has(movie.id)) {
          movieIds.add(movie.id);
          uniqueMovies.push(movie);
        }
      })

      let grouped;
      if (movies.length === 0) {
        grouped = {};
      } else if (formGenres[0] === "all") {
        grouped = Object.groupBy(uniqueMovies, movie => movie.genre_ids[0]);
      } else {
        grouped = {}
        const movieIdsInAllGenres = new Set();
        if (formGenres.length > 1) {
          const moviesInAllGenres = uniqueMovies.filter(movie => formGenres.every(genreID => movie.genre_ids.includes(genreID)));
          if (moviesInAllGenres.length > 0) {
            grouped["0"] = moviesInAllGenres;
            moviesInAllGenres.forEach(movie => movieIdsInAllGenres.add(movie.id));
          }
        }
        formGenres.forEach(genreID => { grouped[genreID.toString()] = [] });
        uniqueMovies.forEach(movie => {
          for (const genreID of formGenres) {
            if (!movieIdsInAllGenres.has(movie.id) && movie.genre_ids.includes(genreID)) {
              grouped[genreID.toString()].push(movie);
              break;
            }
          }
        });
      }

      dispatch(setRecommendation(grouped));
      navigate("/recommendation");
      setIsSubmitting(false);

    } catch (err) {
      console.error(err);
    }
  };

  const clearFields = () => {
    reset();
    setFormGenres([]);
  };

  const Images = () => {
    const indices = [...Array(trending.results.length).keys()];
    for (var i = indices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = indices[i];
      indices[i] = indices[j];
      indices[j] = temp;
    }

    return (
      <ImageList sx={{ position: "fixed", left: 0, top: 40, width: "100%" }} cols={isSm ? 2 : isMd ? 3 : 4} >
        {trending.results.map((item, index) => (
          <ImageListItem
            key={item.backdrop_path}
            className={classnames.background}
            style={{ animationDelay: `${indices[index] * 50}ms` }}
          >
            <img
              srcSet={`https://image.tmdb.org/t/p/w500${item.backdrop_path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{ filter: 'brightness(80%)' }}
            />
          </ImageListItem>
        ))}1
      </ImageList>
    );
  }



  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <Images />
      <Box
        className={classnames.form}
        style={{
          position: "relative",
          backgroundColor: "#1b1b1b",
          border: "1px grey solid",
          padding: "10px 25px",
          top: "20px"
        }}
      >
        <Typography variant="h2" style={{ color: "white", marginBottom: 0, marginTop: 20 }}>
          Discover movies
        </Typography>
        <Collapse in={!start} timeout={800}>
          <>
            <Typography variant="h5" style={{ color: "white", marginTop: 20, marginBottom: 30 }}>
              Stream, save and more
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#37B7C3",
                color: "black",
                marginBottom: "20px",
                fontWeight: "bold",
                '&:hover': {
                  backgroundColor: "#9bdbe1",
                  color: 'black',
                }
              }}
              size="large"
              onClick={() => dispatch(setStartnow(true))}
            >
              <Typography>Start now</Typography>
            </Button>
          </>
        </Collapse>

        <Collapse in={start} timeout={800}>
          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl fullWidth variant="standard" required margin="normal">
              <InputLabel id="form-language" style={{ color: "white" }}>
                Language
              </InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="form-language"
                    MenuProps={MenuProps}
                    style={{ color: "white", borderBottom: "1px solid white" }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {languages.map((lang) => (
                      <MenuItem key={lang["iso_639_1"]} value={lang["iso_639_1"]}>
                        {lang["english_name"]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
                name="language"
                defaultValue=""
              />
            </FormControl>

            <FormControl fullWidth variant="standard" required margin="normal">
              <InputLabel id="form-region" style={{ color: "white" }}>
                Region
              </InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="form-region"
                    MenuProps={MenuProps}
                    style={{ color: "white", borderBottom: "1px solid white" }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {regions.map((region) => (
                      <MenuItem
                        key={region["iso_3166_1"]}
                        value={region["iso_3166_1"]}
                      >
                        {region["english_name"]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
                name="region"
                defaultValue=""
              />
            </FormControl>

            <FormControl fullWidth variant="standard" required margin="normal">
              <InputLabel id="form-genre" style={{ color: "white" }}>
                Genre
              </InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="form-genre"
                    multiple
                    value={formGenres}
                    onChange={handleGenreChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              value === "all"
                                ? "All"
                                : genres.filter((genre) => genre.id === value)[0]
                                  .name
                            }
                            style={{ color: "white", backgroundColor: "#292929" }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    style={{ color: "white", borderBottom: "1px solid white" }}
                  >
                    <MenuItem
                      value="all"
                      disabled={formGenres.length > 0 && formGenres[0] !== "all"}
                    >
                      All
                    </MenuItem>
                    {genres.map((genre) => (
                      <MenuItem
                        key={genre["id"]}
                        value={genre["id"]}
                        disabled={formGenres[0] === "all"}
                      >
                        {genre["name"]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
                name="genre"
                defaultValue=""
              />
            </FormControl>

            <FormControl fullWidth variant="standard" required margin="normal">
              <InputLabel id="form-release" style={{ color: "white" }}>
                Release
              </InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="form-release"
                    style={{ color: "white", borderBottom: "1px solid white" }}
                  >
                    <MenuItem value="nopreference">No Preference</MenuItem>
                    <MenuItem value="last3years">Last 3 Years</MenuItem>
                    <MenuItem value="last5years">Last 5 Years</MenuItem>
                    <MenuItem value="last10years">Last 10 Years</MenuItem>
                  </Select>
                )}
                control={control}
                name="dateRange"
                defaultValue=""
              />
            </FormControl>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "20px",
              }}
            >
              <Button
                variant="contained"
                onClick={clearFields}
                style={{
                  backgroundColor: "#292929",
                  color: "white",
                  textTransform: "none",
                  border: "1px solid white",
                }}
              >
                Clear Fields
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || isSubmitting}
                style={{
                  backgroundColor: isValid ? "#37B7C3" : "#292929",
                  color: isValid ? "black" : "white",
                  textTransform: "none",
                  marginLeft: "10px",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Collapse>
      </Box>

    </div>
  );
}
