import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Drawer, List, ListItem, ListItemText, ListItemButton, Toolbar, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Account from "./Account";
import { logout } from "../features/userSlice";
import axios from "axios";

const drawerWidth = 160;

const UserInfo = () => {
	const username = useSelector((state) => state.user.username);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const navItems = [
		{ label: "Account", path: "/account", icon: <AccountCircleIcon /> },
		{ label: "Watchlists", path: "/account/watchlists", icon: <FavoriteIcon /> },
		{ label: "Reviews", path: "/account/reviews", icon: <CommentIcon /> },
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
		<Box sx={{ display: "flex", paddingTop: "20px" }}>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						backgroundColor: "black",
						color: "white",
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar style={{ height: "80px" }} />
				<List>
					{navItems.map((item) => (
						<ListItem key={item.label} disablePadding>
							<ListItemButton
								component={Link}
								to={item.path}
								sx={{ ":hover": { backgroundColor: "#383838" } }}
							>
								<ListItemText primary={item.label} />
							</ListItemButton>
						</ListItem>
					))}
					<ListItem key="logout" disablePadding>
						<ListItemButton
							component={Link}
							to="/login"
							onClick={() => dispatch(logout())}
							sx={{ ":hover": { backgroundColor: "#383838" } }}
						>
							<ListItemText primary="Log Out" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3, padding: "20px 10px" }}>
				{location.pathname === "/account" && <Account />}
				<Outlet />
			</Box>
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
				<BottomNavigation
					showLabels
					sx={{ display: { xs: "block", sm: "none" }, marginTop: "5px" }}
				>
					{navItems.map((item) => (
						<BottomNavigationAction
							key={item.path}
							label={item.label}
							component={Link}
							to={item.path}
							icon={item.icon}
						/>
					))}
					<BottomNavigationAction
						label="Logout"
						component={Link}
						to="/login"
						onClick={() => dispatch(logout())}
						icon={<LogoutIcon />}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default UserInfo;
