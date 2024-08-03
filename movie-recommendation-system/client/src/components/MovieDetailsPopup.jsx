import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { DialogTitle, DialogContent, Typography, CircularProgress, Box, List, ListItem, ListItemText, Rating, TextField, Button, Stack, IconButton, Icon, Menu, MenuItem, Dialog, DialogContentText, DialogActions, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addReview, removeReview } from "../features/userSlice";
import YoutubeEmbed from "./YoutubeEmbed";
import Streaming from "./Streaming";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const URL = "https://project-11-movie-mavericks.onrender.com"

const MovieDetailsPopup = ({ tmdb_movie_id, onClose }) => {
	const dispatch = useDispatch();

	const loggedIn = useSelector((state) => state.user.loggedIn);
	const userID = useSelector((state) => state.user.user?._id);
	const username = useSelector((state) => state.user.username);

	const [movieDetails, setMovieDetails] = useState(null);
	const [videoID, setVideoID] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [commentSelected, setCommentSelected] = useState(false);
	const [commentButtonEnabled, setCommentButtonEnabled] = useState(false);

	const [movieID, setMovieID] = useState("");
	const [reviews, setReviews] = useState([]);

	const [streamingDialog, setStreamingDialog] = useState(false);
	const [streamingResponse, setStreamingResponse] = useState(null);

	const [editReviewID, setEditReviewID] = useState("");
	const [editComment, setEditComment] = useState("");
	const [editRating, setEditRating] = useState(0);
	const [confirmDelete, setConfirmDelete] = useState(false);

	useEffect(() => {
		const fetchMovieDetails = async () => {
			const options = {
				method: "GET",
				url: `https://api.themoviedb.org/3/movie/${tmdb_movie_id}`,
				params: {
					language: "en-US",
				},
				headers: {
					accept: "application/json",
					Authorization: import.meta.env.VITE_TMDB_BEARER_KEY,
				},
			};

			const videoOptions = {
				method: "GET",
				url: `https://api.themoviedb.org/3/movie/${tmdb_movie_id}/videos?language=en-US`,
				headers: {
					accept: "application/json",
					Authorization: import.meta.env.VITE_TMDB_BEARER_KEY,
				},
			};

			try {
				const response = await axios.request(options);
				setMovieDetails(response.data);
				const videos = await axios.request(videoOptions);
				setVideoID(videos.data.results.find((v) => v.type === "Trailer")?.key);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchMovieDetails();
	}, []);

	useEffect(() => {
		const fetchStreamingDetails = async () => {
			const options = {
				method: "GET",
				url: `https://streaming-availability.p.rapidapi.com/shows/movie/${tmdb_movie_id}`,
				headers: {
					"x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
					"x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
				},
			};

			try {
				const response = await axios.request(options);
				if (Object.keys(response.data.streamingOptions).length !== 0) {
					setStreamingResponse(response.data);
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchStreamingDetails();
	}, []);

	useEffect(() => {
		const fetchMovieComments = async () => {
			let movieResponse;
			try {
				movieResponse = await axios.get(
					`${URL}/movies/${tmdb_movie_id}`
				);
				setMovieID(movieResponse.data._id);
				const responses = movieResponse.data.reviews.map((reviewID) =>
					axios.get(`${URL}/reviews/${reviewID}`)
				);
				Promise.all(responses)
					.then((values) => values.map((value) => value.data))
					.then((data) => setReviews(data));
			} catch (error) {
				try {
					movieResponse = await axios.post(`${URL}/movies`, {
						tmdb_movie_id: tmdb_movie_id,
						title: movieDetails.original_title,
					});
					setMovieID(movieResponse.data._id);
				} catch (postError) {
					console.error(postError);
				}
			}
		};

		if (movieDetails) {
			fetchMovieComments();
		}
	}, [movieDetails]);

	useEffect(() => {
		if (rating > 0 && comment !== "") {
			setCommentButtonEnabled(true);
		} else {
			setCommentButtonEnabled(false);
		}
	}, [rating, comment]);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Typography>Error fetching movie details: {error.message}</Typography>
			</Box>
		);
	}

	const handleComment = async () => {
		if (!loggedIn) {
			alert("Please login before comment");
			return;
		}

		try {
			const body = {
				user_id: userID,
				movie_id: movieID,
				title: original_title,
				rating: rating,
				comment: comment,
			};

			const reviewResponse = await axios.post(
				`${URL}/reviews`,
				body
			);
			const review = reviewResponse.data;

			await axios.patch(`${URL}/movies/${movieID}/reviews`, {
				op: "add",
				reviewID: review._id,
			});
			const reviewWithUsername = { ...review, username: username };
			setReviews((prev) => [reviewWithUsername].concat(prev));

			await axios.patch(`${URL}/users/${userID}/reviews`, {
				op: "add",
				reviewID: review._id,
			});
			dispatch(addReview(review._id));

			handleResetComment();
		} catch (error) {
			console.error(error);
		}
	};

	const handleResetComment = () => {
		setCommentSelected(false);
		setComment("");
		setRating(0);
	};

	const handleClickDelete = () => {
		setConfirmDelete(true);
	}

	const handleDeleteComment = async () => {
		try {
			await axios.delete(`${URL}/reviews/${editReviewID}`);

			await axios.patch(`${URL}/movies/${movieID}/reviews`, {
				op: "delete",
				reviewID: editReviewID
			})
			setReviews(reviews.filter((review) => review._id !== editReviewID))

			await axios.patch(`${URL}/users/${userID}/reviews`, {
				op: "delete",
				reviewID: editReviewID
			})
			dispatch(removeReview(editReviewID));

			setConfirmDelete(false);
		} catch (error) {
			console.error(error);
		}

		setEditReviewID("");
		setEditComment("");
		setEditRating(0);
	}

	const handleClickEditComment = (id, comment, rating) => {
		setEditReviewID(id);
		setEditComment(comment);
		setEditRating(rating);
	}

	const handleCancelEditComent = () => {
		setEditReviewID("");
		setEditComment("");
		setEditRating(0);
	}

	const handleSaveEditComment = async () => {
		try {
			const response = await axios.patch(`${URL}/reviews/${editReviewID}`, {
				rating: editRating,
				comment: editComment
			});
			setReviews(reviews.map((review) =>
				review._id === editReviewID ? { ...response.data, username: username } : review
			));
		} catch (error) {
			console.error(error);
		}

		setEditReviewID("");
		setEditComment("");
		setEditRating(0);
	}

	const {
		original_title,
		poster_path,
		vote_average,
		vote_count,
		overview,
		runtime,
		release_date,
		revenue,
		adult,
		genres,
		production_companies,
	} = movieDetails;

	return (
		<>
			<DialogTitle>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h6" sx={{ fontWeight: "bold", marginRight: "10px" }}>
						{original_title}
					</Typography>
					<Box display="flex">
						{streamingResponse && (
							<Button onClick={() => setStreamingDialog(true)} variant="outlined">
								Stream now
							</Button>
						)}
						<IconButton
							onClick={onClose}
						>
							<CloseIcon />
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent dividers>
				{videoID && <YoutubeEmbed videoID={videoID} title={original_title} />}
				{!videoID && poster_path && (
					<Box display="flex" justifyContent="center">
						<img
							src={`https://image.tmdb.org/t/p/w500${poster_path}`}
							alt={original_title}
							style={{ maxWidth: "100%", height: "auto" }}
						/>
					</Box>
				)}
				<Box display="flex" alignItems="center" mt={2}>
					<Rating
						value={Math.floor(vote_average / 2)}
						precision={0.1}
						readOnly
					/>
					<Typography variant="body2" ml={1}>
						({vote_count} votes)
					</Typography>
				</Box>
				<Typography variant="body1" paragraph>
					{overview}
				</Typography>
				<Typography variant="body2">
					<strong>Runtime:</strong> {runtime} minutes
				</Typography>
				<Typography variant="body2">
					<strong>Release Date:</strong> {release_date}
				</Typography>
				<Typography variant="body2">
					<strong>Revenue:</strong> ${revenue.toLocaleString()}
				</Typography>
				<Typography variant="body2">
					<strong>Genres:</strong>{" "}
					{genres.map((genre) => genre.name).join(", ")}
				</Typography>
				<Typography variant="body2">
					<strong>Production Companies:</strong>{" "}
					{production_companies.map((company) => company.name).join(", ")}
				</Typography>
				<br></br>
				<Typography variant="body1">
					<strong>Comments</strong>
				</Typography>
				<Box style={{ display: 'flex', alignItems: 'flex-end' }}>
					<TextField
						fullWidth
						id="standard-basic"
						label="Leave a comment"
						variant="standard"
						margin="normal"
						autoComplete="off"
						onClick={() => setCommentSelected(true)}
						value={comment}
						onChange={(event) => setComment(event.target.value)}
					/>
					{commentSelected &&
						<Rating
							name="simple-controlled"
							value={rating}
							onChange={(event, newRating) => setRating(newRating)}
							style={{ marginBottom: "10px" }}
						/>
					}
				</Box>
				{commentSelected &&
					<Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button variant="outlined" onClick={handleResetComment}>
							Cancel
						</Button>
						<Button
							variant="contained"
							onClick={handleComment}
							disabled={!commentButtonEnabled}
							style={{ marginLeft: "10px" }}
						>
							Comment
						</Button>
					</Box>
				}

				<List>
					{reviews.map((review) => (
						<Fragment key={review._id}>
							<ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
								<ListItemText
									primary={review.username}
									secondary={
										editReviewID === review._id ?
											<TextField
												fullWidth
												variant="standard"
												value={editComment}
												onChange={(event) => setEditComment(event.target.value)}
											/>
											:
											review.comment
									}
								/>
								{editReviewID === review._id ?
									<Rating value={editRating} size="small" onChange={(event, rating) => setEditRating(rating)} />
									:
									<Rating value={review.rating} size="small" readOnly />
								}
								{review.user_id === userID ?
									<>
										<IconButton size="small" onClick={() => handleClickEditComment(review._id, review.comment, review.rating)}>
											<EditIcon />
										</IconButton>
										<Dialog
											open={confirmDelete}
											onClose={() => setConfirmDelete(false)}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
											<DialogContent>
												Confirm delete comment?
											</DialogContent>
											<DialogActions>
												<Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
												<Button color="error" onClick={handleDeleteComment}>Delete</Button>
											</DialogActions>
										</Dialog>
									</>
									:
									<IconButton size="small" disabled>
										<Icon />
									</IconButton>
								}
							</ListItem>
							{editReviewID === review._id && (
								<Box style={{ display: 'flex', justifyContent: "flex-end" }}>
									<Button variant="outlined" onClick={handleCancelEditComent}>
										Cancel
									</Button>
									<Button variant="outlined" style={{ marginRight: "10px", marginLeft: "10px" }} onClick={handleSaveEditComment} disabled={!editRating || editComment.trim() === ""}>
										Save
									</Button>
									<Button variant="outlined" color="error" onClick={handleClickDelete}>
										Delete
									</Button>
								</Box>
							)}
						</Fragment>
					))}
				</List>
			</DialogContent>
			{streamingResponse && (
				<Streaming
					key={tmdb_movie_id}
					open={streamingDialog}
					onClose={() => setStreamingDialog(false)}
					response={streamingResponse}
				/>
			)}
		</>
	);
};

export default MovieDetailsPopup;
