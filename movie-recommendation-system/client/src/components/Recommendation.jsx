import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Dialog } from "@mui/material";
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
import { addWatchlist } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const recommendations = useSelector((state) => state.recommendations);
  const [selectedMovie, setSelectedMovie] = useState();
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [showWatchlistDialog, setShowWatchlistDialog] = useState(false);
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
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loggedIn, userID]);

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

  const handleWatchlistSubmit = () => {
    if (selectedWatchlist) {
      // axios
      //   .post(`http://localhost:3000/watchlists/${selectedWatchlist}/movies`, {
      //     movieID: selectedMovie,
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     setShowWatchlistDialog(false);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      console.log("Watchlist selected:", selectedWatchlist);
    } else if (newWatchlistName) {
      // axios
      //   .post("http://localhost:3000/watchlists", {
      //     userID,
      //     name: newWatchlistName,
      //   })
      //   .then((response) => {
      //     const newWatchlist = response.data;
      //     return axios.post(
      //       `http://localhost:3000/watchlists/${newWatchlist._id}/movies`,
      //       {
      //         movieID: selectedMovie.id,
      //       }
      //     );
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     setShowWatchlistDialog(false);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      console.log("New watchlist name:", newWatchlistName);
    }
  };

  const renderWatchlistSelect = () => {
    if (!watchlists) {
      console.log("No watchlists found");
      return null;
    }
    if (watchlists.length === 0) {
      console.log("Watchlist is empty");
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
    <GridCard
      key={movie.id}
      movie={movie}
      onLearnMoreClick={() => handleLearnMoreClick(movie)}
      onAddToWatchlist={() => handleAddToWatchlist(movie)}
    />
  ));

  return (
    <>
      <h1>Recommendations</h1>
      <Grid container spacing={3}>
        {cards}
      </Grid>
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
        <DialogContent>{renderWatchlistSelect()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWatchlistDialog(false)}>Cancel</Button>
          <Button onClick={handleWatchlistSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function GridCard(props) {
  const { movie, onLearnMoreClick, onAddToWatchlist } = props;

  return (
    <Grid item xs={6} sm={3}>
      <Card sx={{ backgroundColor: "#37474F", color: "white" }}>
        <CardActionArea onClick={onLearnMoreClick}>
          <CardMedia
            component="img"
            style={{ height: "300px", objectFit: "cover" }}
            image={"https://image.tmdb.org/t/p/w500" + movie["poster_path"]}
            alt={movie.title}
          />
          <CardContent
            style={{
              height: "100px",
              alignContent: "center",
              overflowY: "auto",
            }}
          >
            <Typography variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography gutterBottom>
              {movie.title != movie.original_title &&
                "(" + movie.original_title + ")"}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onAddToWatchlist}
          >
            Add to Watchlist
          </Button>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
