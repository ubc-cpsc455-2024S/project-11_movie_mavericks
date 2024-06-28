import React from "react";
import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const FeelingLucky = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchRandomMovie = async () => {
    setLoading(true);
    const url =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzFmZDAwNzJjNzUwNWIyZDRkMDYwMTMwYjJlN2QxNSIsInN1YiI6IjY2NTY3NGM4NDQzMTEyYzc1OTUxMjI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uhn4peiHp_lezXQfUV5z10QcDfXBdWQkrrcH9qT48S4",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setRandomMovie(data.results[randomIndex]);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRandomMovie(null);
  };

  return (
    <div>
      <Button
        id="luckyBtn"
        type="button"
        onClick={fetchRandomMovie}
        variant="contained"
        color="primary"
      >
        I'm Feeling Lucky!
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>
          Your Lucky Movie!
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            randomMovie && (
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
                >
                  {randomMovie.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {randomMovie.overview}
                </Typography>

                <Box display="flex" justifyContent="center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
                    alt={randomMovie.original_title}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Box>

                <Typography variant="body2" mt={2}>
                  <strong>Release Date:</strong> {randomMovie.release_date}
                </Typography>
                <Typography variant="body2">
                  <strong>Rating:</strong> {randomMovie.vote_average}
                </Typography>
                <Typography variant="body2">
                  <strong>Adult:</strong> {randomMovie.adult ? "Yes" : "No"}
                </Typography>
              </Box>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeelingLucky;
