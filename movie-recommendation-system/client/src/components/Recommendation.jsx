import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Dialog } from "@mui/material";
import MovieDetailsPopup from "./MovieDetailsPopup";
import axios from "axios";
import { useEffect } from "react";
import {
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addWatchlist, addMovieToWatchlist } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3000/watchlists/${userID}`)
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

  const handleCreateNewWatchlist = async () => {
    try {
      await axios.post("http://localhost:3000/watchlists", {
        user_id: userID,
        name: newWatchlistName,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setNewWatchlistName("");
    }
    setWatchlistCreatedCount(watchlistsCreatedCount + 1);
  };

  const handleWatchlistSubmit = async () => {
    if (selectedWatchlist) {
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
      try {
        const response = await axios.request(options);
        const movieDetails = {
          userID: userID,
          watchlist_id: selectedWatchlist,
          movie_id: response.data.id,
          movie_title: response.data.original_title,
        };
        dispatch(addWatchlist(movieDetails));
        dispatch(addMovieToWatchlist(movieDetails));
        await axios.post(
          `http://localhost:3000/watchlists/${selectedWatchlist}/movies`,
          {
            movieID: response.data.id,
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    setShowWatchlistDialog(false);
  };

  const renderWatchlistSelect = () => {
    if (!watchlists) {
      return null;
    }
    if (watchlists.length === 0) {
      return (
        <TextField
          margin="dense"
          label="New Watchlist Name"
          fullWidth
          value={newWatchlistName}
          onChange={(e) => setNewWatchlistName(e.target.value)}
        />
      );
    }

    return (
      <FormControl fullWidth>
        <InputLabel>Select watchlist</InputLabel>
        <Select
          value={selectedWatchlist}
          onChange={(e) => setSelectedWatchlist(e.target.value)}
        >
          {watchlists.map((watchlist) => (
            <MenuItem key={watchlist._id} value={watchlist._id}>
              {watchlist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const cards = recommendations.map((movie) => (
    <Poster
      key={movie.id}
      movie={movie}
      onLearnMoreClick={() => handleLearnMoreClick(movie)}
      onAddToWatchlist={() => handleAddToWatchlist(movie)}
    />
  ));

  return (
    <>
      <h1 style={{ color: "white" }}>Recommendations</h1>
      <div className="row">
        <div className="row-posters">{cards}</div>
      </div>
      <Dialog
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
        <DialogContent>
          {renderWatchlistSelect()}
          {watchlists.length > 0 && (
            <TextField
              autoFocus
              margin="dense"
              label="Create new Watchlist"
              type="text"
              fullWidth
              variant="standard"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWatchlistDialog(false)}>Cancel</Button>
          <Button onClick={handleWatchlistSubmit}>Add</Button>
          <Button onClick={handleCreateNewWatchlist}>
            Create new Watchlist
          </Button>
        </DialogActions>
      </Dialog>
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
        onClick={onLearnMoreClick}
      />
      <button className="watchlist-button" onClick={onAddToWatchlist}>
        Add to watchlist
      </button>
    </div>
  );
}
