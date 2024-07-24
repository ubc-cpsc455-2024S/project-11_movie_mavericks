import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Container, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Account from "./Account";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import axios from "axios";

const StyledContainer = styled(Container)(({ theme }) => ({
	paddingTop: theme.spacing(4),
}));

const Sidebar = styled(Box)(({ theme }) => ({
	width: "200px",
	paddingRight: theme.spacing(2),
	borderRight: `1px solid ${theme.palette.divider}`,
	backgroundColor: "#1b1b1b",
}));

const UserInfo = () => {
	const username = useSelector((state) => state.user.username);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const navItems = [
		{ label: "My Account", path: "/account" },
		{ label: "My Watchlists", path: "/account/wishlists" },
		{ label: "My reviews", path: "/account/reviews" },
	];

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
		<StyledContainer maxWidth="lg">
			<Paper
				elevation={12}
				sx={{ display: "flex", padding: 3, backgroundColor: "#1b1b1b" }}
			>
				<Sidebar>
					{navItems.map((item) => (
						<Button
							fullWidth
							variant="contained"
							sx={{ marginBottom: 2 }}
							key={item.label}
							component={Link}
							to={item.path}
						>
							{item.label}
						</Button>
					))}
					<Button
						fullWidth
						variant="contained"
						sx={{ marginBottom: 2 }}
						component={Link}
						to="/login"
						onClick={() => dispatch(logout())}
					>
						Log Out
					</Button>
					<Button
						fullWidth
						variant="outlined"
						sx={{
							backgroundColor: "#7a0012",
							color: "white",
							":hover": { backgroundColor: "black" },
						}}
						onClick={deleteAccount}
					>
						Delete Account
					</Button>
				</Sidebar>
				<Box sx={{ flexGrow: 1, paddingLeft: 3, backgroundColor: "#1b1b1b" }}>
					<Typography
						sx={{
							textAlign: "center",
							fontSize: "2em",
							fontWeight: "bold",
							color: "white",
						}}
						variant="h5"
						gutterBottom
					>
						Hello there {username}!
					</Typography>
					{location.pathname === "/account" && <Account />}
					<Outlet />
				</Box>
			</Paper>
		</StyledContainer>
	);
};

export default UserInfo;
