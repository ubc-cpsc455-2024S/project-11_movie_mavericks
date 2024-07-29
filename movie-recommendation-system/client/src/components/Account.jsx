import React from "react";
import { Paper, Box, Grid, TextField, Button, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editUser, logout } from "../features/userSlice";
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
	const navigate = useNavigate();

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

	const deleteAccount = async () => {
		if (
			window.confirm(
				"Are you sure you want to delete your account? This action cannot be undone."
			)
		) {
			try {
				const url = `https://project-11-movie-mavericks.onrender.com/users/${username}`;
				await axios.delete(url);
				dispatch(logout());
				navigate("/");
				alert("Account deleted successfully");
			} catch (error) {
				alert("Failed to delete account");
			}
		}
	};

	return (
		<div
			style={{
				backgroundColor: "#1b1b1b",
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
				<Box>
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
						Change username or password
					</Typography>
					<Grid container spacing={2} sx={{ marginTop: "20px" }}>
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
									minWidth: "200px",
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
						<Grid item xs={12}>
							<Button
								variant="contained"
								onClick={deleteAccount}
								sx={{
									minWidth: "200px",
									backgroundColor: "darkred",
									color: "white",
									"&:hover": {
										backgroundColor: "#7a0012",
									},
								}}
							>
								Delete Account
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</div>
	);
};

export default Account;
