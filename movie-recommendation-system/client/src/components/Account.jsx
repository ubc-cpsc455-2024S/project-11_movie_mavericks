import React from "react";
import { Paper, Box, Grid, TextField, Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUser } from "../features/userSlice";
import axios from "axios";

const Account = () => {
	const { username: initialUsername, password: initialPassword } = useSelector(
		(state) => ({
			username: state.user.username,
			password: state.user.password,
		})
	);
	const [username, setUsername] = useState(initialUsername);
	const [password, setPassword] = useState(initialPassword);

	const dispatch = useDispatch();

	const applyChanges = async (e) => {
		if (!username || !password) {
			alert("Please enter values for all fields");
			return;
		}
		const user = { username: username, password: password };
		try {
			const url = `https://project-11-movie-mavericks.onrender.com/users/${username}`;
			const response = await axios.put(url, user);
			dispatch(
				editUser({
					username: response.data.username,
					password: response.data.password,
				})
			);
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	return (
		<div
			style={{
				backgroundColor: "#1b1b1b",
				minHeight: "100vh",
				padding: "20px",
			}}
		>
			<Paper
				elevation={4}
				sx={{
					padding: "50px 30px",
					marginBottom: 2,
					backgroundColor: "#292929",
					borderRadius: 10,
				}}
			>
				<Box sx={{ flexGrow: 1, paddingLeft: 3, paddingTop: 4 }}>
					<Outlet />
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
						Edit below to change your account details.
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} md={8} sx={{ margin: "30px 50px" }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										label="Username"
										onChange={(e) => setUsername(e.target.value)}
										value={username}
										fullWidth
										variant="outlined"
										sx={{
											marginBottom: 2,
											color: "white",
											"& .MuiInputBase-root": {
												color: "white",
											},
											"& .MuiOutlinedInput-root": {
												"& fieldset": {
													borderColor: "white",
												},
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "white",
												},
											},
											"& .MuiInputLabel-root": {
												color: "white",
											},
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										label="Password"
										type="password"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										fullWidth
										variant="outlined"
										sx={{
											color: "white",
											"& .MuiInputBase-root": {
												color: "white",
											},
											"& .MuiOutlinedInput-root": {
												"& fieldset": {
													borderColor: "white",
												},
												"&:hover fieldset": {
													borderColor: "white",
												},
												"&.Mui-focused fieldset": {
													borderColor: "white",
												},
											},
											"& .MuiInputLabel-root": {
												color: "white",
											},
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="contained"
										onClick={applyChanges}
										sx={{
											marginTop: 2,
											backgroundColor: "#37B7C3",
											color: "black",
											"&:hover": {
												backgroundColor: "#37B7C3",
											},
										}}
									>
										Apply Changes
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</div>
	);
};

export default Account;
