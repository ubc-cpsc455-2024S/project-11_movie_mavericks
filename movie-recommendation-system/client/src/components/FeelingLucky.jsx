import React from "react";
import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MovieDetailsPopup from "./MovieDetailsPopup";

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
				sx={{ border: "5px solid skyblue" }}
			>
				I'm Feeling Lucky!
			</Button>
			<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
