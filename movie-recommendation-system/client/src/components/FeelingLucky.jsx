import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MovieDetailsPopup from "./MovieDetailsPopup";
import confetti from "canvas-confetti";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const FeelingLucky = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchRandomMovie = async () => {
    setLoading(true);
    const url =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_BEARER_KEY,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setRandomMovie(data.results[randomIndex]);
      setLoading(false);
      setOpen(true);
      triggerConfetti();
    } catch (error) {
      console.error("Error fetching movie:", error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRandomMovie(null);
  };

  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      const timeLeft = end - Date.now();

      if (timeLeft <= 0) {
        return;
      }

      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: ["text"],
        text: "🍀",
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: ["text"],
        text: "🍀",
      });

      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  return (
    <div>
      <Button
        id="luckyBtn"
        type="button"
        onClick={fetchRandomMovie}
        variant="contained"
        color="primary"
        sx={{ border: "5px solid skyblue" }}
      >
        I'm Feeling Lucky!
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ textAlign: "center" }}>
          🍀 Your Lucky Movie! 🍀
        </DialogTitle>

        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            randomMovie && (
              <MovieDetailsPopup
                tmdb_movie_id={randomMovie.id}
                onClose={handleClose}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeelingLucky;
