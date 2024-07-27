import {
	Box,
	List,
	ListItem,
	ListItemText,
	Paper,
	Rating,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Reviews = () => {
	const reviewIDs = useSelector((state) => state.user.reviews);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const getReviews = async () => {
			const responses = reviewIDs.map((reviewID) =>
				axios.get(`https://project-11-movie-mavericks.onrender.com/reviews/${reviewID}`)
			);
			Promise.all(responses)
				.then((values) => values.map((value) => value.data))
				.then((data) => setReviews(data));
		};
		getReviews();
	}, [reviewIDs]);

	return (
		<Box
			sx={{
				justifyContent: "top",
				alignItems: "top",
				Height: "80vh",
				minWidth: "65vw",
				backgroundColor: "#1b1b1b",
				padding: 2,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					maxWidth: "1200px",
					padding: "50px 30px",
					margin: "20px",
					backgroundColor: "#292929",
					borderRadius: 10,
				}}
			>
				<Typography variant="h5" gutterBottom color="white">
					My Reviews
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
	);
};

export default Reviews;
