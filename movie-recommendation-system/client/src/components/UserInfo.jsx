import React from "react";
import { useSelector } from "react-redux";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Toolbar,
	BottomNavigation,
	BottomNavigationAction,
	Paper,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Account from "./Account";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import axios from "axios";

const drawerWidth = 170;

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
				const url = `http://localhost:3000/users/${username}`;
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
				backgroundColor="blue"
			>
				<Toolbar />
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
					<ListItem key="delete" disablePadding>
						<ListItemButton
							onClick={deleteAccount}
							sx={{ ":hover": { backgroundColor: "#7a0012" } }}
						>
							<ListItemText primary="Delete Account" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
					<BottomNavigationAction
						label="Delete Account"
						onClick={deleteAccount}
						icon={<PersonRemoveIcon />}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default UserInfo;
