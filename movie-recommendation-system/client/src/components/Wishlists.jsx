import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, Card, CardContent, Typography, Dialog } from "@mui/material";
import { removeMovieFromWatchlist } from "../features/userSlice";
import {
	TwitterShareButton,
	FacebookShareButton,
	TwitterIcon,
	FacebookIcon,
	LinkedinShareButton,
	LinkedinIcon,
} from "react-share";
import MovieDetailsPopup from "./MovieDetailsPopup";

export default function Watchlists() {
	const [watchlists, setWatchlists] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const userID = useSelector((state) => state.user.user?._id);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchWatchlists = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/watchlists/${userID}`
				);
				const watchlists = await Promise.all(
					response.data.map(async (watchlist) => {
						const movies = await Promise.all(
							watchlist.movies.map(async (movieID) => {
								const movieResponse = await axios.get(
									`https://api.themoviedb.org/3/movie/${movieID}`,
									{
										params: { language: "en-US" },
										headers: {
											accept: "application/json",
											Authorization: import.meta.env.VITE_TMDB_BEARER_KEY,
										},
									}
								);
								return movieResponse.data;
							})
						);
						return { ...watchlist, movies };
					})
				);
				setWatchlists(watchlists);
			} catch (error) {
				console.error(error);
			}
		};
		fetchWatchlists();
	}, [userID]);

	const handleRemoveMovie = async (watchlistID, movieID) => {
		try {
			await axios.delete(
				`http://localhost:3000/watchlists/${watchlistID}/movies/${movieID}`
			);
			dispatch(removeMovieFromWatchlist({ watchlistID, movieID }));
			setWatchlists(
				watchlists.map((watchlist) => {
					if (watchlist._id === watchlistID) {
						return {
							...watchlist,
							movies: watchlist.movies.filter((movie) => movie.id !== movieID),
						};
					}
					return watchlist;
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (watchlistID) => {
		try {
			await axios.delete(`http://localhost:3000/watchlists/${watchlistID}`);
			setWatchlists(
				watchlists.filter((watchlist) => watchlist._id !== watchlistID)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleLearnMoreClick = (movie) => {
		setSelectedMovie(movie.id);
	};

	const handleClose = () => {
		setSelectedMovie(null);
	};

	return (
		<div>
			{watchlists.map((watchlist) => (
				<Card
					key={watchlist._id}
					sx={{
						justifyContent: "top",
						alignItems: "top",
						Height: "80vh",
						minWidth: "65vw",
						padding: 2,
						marginBottom: 2,
						backgroundColor: "#292929",
						borderRadius: 10,
					}}
				>
					<CardContent>
						<Typography
							variant="h5"
							sx={{
								marginBottom: 1,
								marginTop: 1,
								marginLeft: 1,
								marginRight: 1,
								fontWeight: "bold",
								color: "white",
							}}
						>
							Watchlist: {watchlist.name}
						</Typography>
						{watchlist.movies.map((movie) => (
							<div
								key={movie.id}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 1,
								}}
							>
								<div style={{ flex: 1 }}>
									<Typography
										variant="body1"
										className="hover-title"
										style={{
											marginRight: 50,
											marginLeft: 5,
											fontWeight: "bold",
											fontSize: 20,
											textAlign: "left",
											textDecoration: "none",
											textDecorationColor: "white",
											textDecorationStyle: "solid",
											textDecorationThickness: "5px",
											textDecorationSkip: "none",
											textDecorationSkipInk: "none",
										}}
										onClick={() => handleLearnMoreClick(movie)}
									>
										{movie.title}
									</Typography>
								</div>
								<div style={{ display: "flex", alignItems: "center" }}>
									<TwitterShareButton
										url={`https://www.themoviedb.org/movie/${movie.id}`}
										title={`Check out this movie: ${movie.title}`}
										style={{ marginRight: 10 }}
									>
										<TwitterIcon size={32} round />
									</TwitterShareButton>
									<FacebookShareButton
										url={`https://www.themoviedb.org/movie/${movie.id}`}
										quote={`Check out this movie: ${movie.title}`}
										style={{ marginRight: 10 }}
									>
										<FacebookIcon size={32} round />
									</FacebookShareButton>
									<LinkedinShareButton
										url={`https://www.themoviedb.org/movie/${movie.id}`}
										title={`Check out this movie: ${movie.title}`}
										style={{ marginRight: 10 }}
									>
										{" "}
										<LinkedinIcon size={32} round />
									</LinkedinShareButton>
									<Button
										variant="contained"
										color="error"
										size="small"
										style={{
											width: 40,
											height: 40,
											borderRadius: 20,
											padding: 0,
											minWidth: 0,
										}}
										onClick={() => handleRemoveMovie(watchlist._id, movie.id)}
									>
										X
									</Button>
								</div>
							</div>
						))}
					</CardContent>
					<Button
						variant="contained"
						color="error"
						onClick={() => handleDelete(watchlist._id)}
						sx={{
							marginBottom: 3,
							padding: 1,
							fontSize: 15,
							fontWeight: "bold",
							borderRadius: 20,
						}}
					>
						Delete Watchlist
					</Button>
				</Card>
			))}
			<Dialog
				open={!!selectedMovie}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
				PaperProps={{
					sx: { backgroundColor: "#e0dede" },
				}}
			>
				{selectedMovie && (
					<MovieDetailsPopup
						tmdb_movie_id={selectedMovie}
						onClose={handleClose}
					/>
				)}
			</Dialog>
		</div>
	);
}
