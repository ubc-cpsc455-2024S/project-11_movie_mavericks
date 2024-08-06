import {
	Box,
	List,
	ListItem,
	ListItemText,
	Paper,
	Rating,
	Typography,
	CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Reviews = () => {
	const reviewIDs = useSelector((state) => state.user.reviews);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getReviews = async () => {
			const responses = reviewIDs.map((reviewID) =>
				axios.get(
					`https://project-11-movie-mavericks.onrender.com/reviews/${reviewID}`
				)
			);
			Promise.all(responses)
				.then((values) => values.map((value) => value.data))
				.then((data) => setReviews(data))
				.then(() => setLoading(false));
		};
		getReviews();
	}, [reviewIDs]);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<div style={{ marginTop: "40px" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					height: "80%",
					backgroundColor: "#1b1b1b",
					maxWidth: "500px",
				}}
			>
				<Paper
					elevation={3}
					sx={{
						padding: "50px 30px",
						backgroundColor: "#292929",
						borderRadius: 10,
					}}
				>
					<Typography variant="h5" gutterBottom color="white">
						{reviews.length === 0 ? "No review yet" : "My Reviews"}
					</Typography>
					<List>
						{reviews.map((item, index) => (
							<ListItem
								key={index}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<ListItemText
									primary={item.title}
									secondary={item.comment}
									sx={{
										"& .MuiListItemText-primary": { color: "white" },
										"& .MuiListItemText-secondary": { color: "white" },
									}}
								/>
								<Box sx={{ flexGrow: 1, color: "white" }} />
								<Rating
									value={item.rating}
									size="small"
									readOnly
									sx={{ ml: 2 }}
								/>
							</ListItem>
						))}
					</List>
				</Paper>
			</Box>
		</div>
	);
};

export default Reviews;
