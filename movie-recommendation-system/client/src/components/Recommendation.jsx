import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Dialog } from "@mui/material";
import MovieDetailsPopup from "./MovieDetailsPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const recommendations = useSelector((state) => state.recommendations);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleLearnMoreClick = (movie) => {
    setSelectedMovie(movie.id);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const cards = recommendations.map((movie) => (
    <GridCard
      key={movie.id}
      movie={movie}
      onLearnMoreClick={() => handleLearnMoreClick(movie)}
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
    </>
  );
}

function GridCard(props) {
  const { movie, onLearnMoreClick } = props;
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const navigate = useNavigate();

  const addToWatchlist = (movie) => {
    if (loggedIn) {
      console.log(movie);
    } else {
      alert("Please log in to add movies to your watchlist.");
      navigate("/login");
    }
  };
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
            onClick={() => addToWatchlist(movie)}
          >
            Add to Watchlist
          </Button>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
