import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { languages } from "../config/languages";
import { regions } from "../config/regions";
import { genres } from "../config/genre";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRecommendation } from "../features/recommendationsSlice";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import axios from "axios";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formGenres, setFormGenres] = useState([]);

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

  return (
    <div
      style={{
        backgroundColor: "#1b1b1b",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div>
        <h1 style={{ color: "white" }}>Discover movies!</h1>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#1b1b1b",
          padding: "20px",
          borderRadius: "8px",
        }}
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
    </div>
  );
}
