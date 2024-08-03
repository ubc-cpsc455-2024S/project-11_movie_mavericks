import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Autocomplete, Button, Dialog } from "@mui/material";
import MovieDetailsPopup from "./MovieDetailsPopup";
import { genres } from "../config/genre";
import axios from "axios";
import { useEffect } from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addWatchlist, addMovieToWatchlist } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Recommendation() {
  const recommendations = useSelector((state) => state.recommendations);
  const [selectedMovie, setSelectedMovie] = useState();
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [showWatchlistDialog, setShowWatchlistDialog] = useState(false);
  const [watchlistsCreatedCount, setWatchlistCreatedCount] = useState(0);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const userID = useSelector((state) => state.user.user?._id);
  const [selectedNewWatchlist, setSelectedNewWatchlist] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(
          `https://project-11-movie-mavericks.onrender.com/watchlists/${userID}`
        )
        .then((response) => {
          setWatchlists(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loggedIn, userID, watchlistsCreatedCount]);

  const handleLearnMoreClick = (movie) => {
    setSelectedMovie(movie.id);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const handleAddToWatchlist = (movie) => {
    if (loggedIn) {
      setSelectedMovie(movie.id);
      setShowWatchlistDialog(true);
    } else {
      alert("Please log in to add movies to your watchlist.");
      navigate("/login");
    }
  };

  const handleWatchlistSubmit = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${selectedMovie}`,
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_BEARER_KEY,
      },
    };

    const tmdbResponse = await axios.request(options);
    const movieDetails = {
      userID: userID,
      watchlist_id: selectedWatchlist,
      movie_id: tmdbResponse.data.id,
      movie_title: tmdbResponse.data.original_title,
    };

    if (selectedWatchlist) {
      let watchlistID = watchlists.filter((w) => w.name == selectedWatchlist)[0]
        ._id;
      try {
        dispatch(addWatchlist(movieDetails));
        dispatch(addMovieToWatchlist(movieDetails));

        await axios.post(
          `https://project-11-movie-mavericks.onrender.com/watchlists/${watchlistID}/movies`,
          {
            movieID: tmdbResponse.data.id,
          }
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setSelectedWatchlist("");
      }
    } else if (selectedNewWatchlist.length > 0) {
      try {
        const newWatchlistresponse = await axios.post(
          "https://project-11-movie-mavericks.onrender.com/watchlists",
          {
            user_id: userID,
            name: selectedNewWatchlist,
          }
        );
        const { _id } = newWatchlistresponse.data;
        dispatch(addWatchlist(movieDetails));
        dispatch(addMovieToWatchlist(movieDetails));
        await axios.post(
          `https://project-11-movie-mavericks.onrender.com/watchlists/${_id}/movies`,
          {
            movieID: tmdbResponse.data.id,
          }
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setNewWatchlistName("");
      }
      setWatchlistCreatedCount(watchlistsCreatedCount + 1);
    }

    setShowWatchlistDialog(false);
  };

  const renderWatchlistSelect = () => {
    return (
      <Autocomplete
        value={selectedWatchlist}
        onChange={(event, newValue) => {
          setSelectedWatchlist(newValue);
        }}
        inputValue={selectedNewWatchlist}
        onInputChange={(event, newInputValue) => {
          setSelectedNewWatchlist(newInputValue);
        }}
        id="combo-box-demo"
        options={watchlists.map((watchlist) => watchlist.name)}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Watchlists" />}
      />
    );
  };

  const entries = Object.entries(recommendations);
  const sortedCategories =
    entries.length === 0
      ? []
      : entries[0][0] === "0"
      ? [
          entries[0],
          ...entries.slice(1).sort((m1, m2) => m2[1].length - m1[1].length),
        ]
      : entries.sort((m1, m2) => m2[1].length - m1[1].length);
  const categoryComponents =
    sortedCategories.length === 0 ? (
      <h2 style={{ color: "white" }}>No recommendations, please try again!</h2>
    ) : (
      sortedCategories.map(([genreID, movies]) => (
        <Category
          key={genreID}
          genreID={genreID}
          movies={movies}
          handleLearnMoreClick={handleLearnMoreClick}
          handleAddToWatchlist={handleAddToWatchlist}
        />
      ))
    );

  return (
    <div style={{ paddingTop: "80px" }}>
      {categoryComponents}
      <Dialog
        fullScreen={fullScreen}
        open={!!selectedMovie}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {selectedMovie && (
          <MovieDetailsPopup
            tmdb_movie_id={selectedMovie}
            onClose={handleClose}
          />
        )}
      </Dialog>
      <Dialog
        open={showWatchlistDialog}
        onClose={() => setShowWatchlistDialog(false)}
      >
        <DialogTitle>Add to Watchlist</DialogTitle>
        <DialogContent>{renderWatchlistSelect()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWatchlistDialog(false)}>Cancel</Button>
          <Button onClick={handleWatchlistSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Category(props) {
  const { genreID, movies, handleLearnMoreClick, handleAddToWatchlist } = props;
  return (
    <>
      <h2 style={{ color: "white", textAlign: "left" }}>
        {Number(genreID) === 0
          ? "Featured"
          : genres.find(({ id }) => id === Number(genreID))?.name ?? "Other"}
      </h2>
      <div className="row">
        <div className="row-posters">
          {movies.map((movie) => (
            <Poster
              key={movie.id}
              movie={movie}
              onLearnMoreClick={() => handleLearnMoreClick(movie)}
              onAddToWatchlist={() => handleAddToWatchlist(movie)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function Poster(props) {
  const { movie, onLearnMoreClick, onAddToWatchlist } = props;
  return (
    <div className="row-poster-container">
      <img
        className="row-poster"
        src={"https://image.tmdb.org/t/p/w500" + movie["poster_path"]}
        alt={movie["original_title"]}
        onClick={onLearnMoreClick}
      />
      <button className="watchlist-button" onClick={onAddToWatchlist}>
        Add to watchlist
      </button>
    </div>
  );
}
