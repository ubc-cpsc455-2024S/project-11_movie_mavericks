import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "black",
}));

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Recommendation", path: "/recommendation" },
  { label: "About", path: "/about" },
  { label: "I'm Feeling Lucky", path: "/feeling-lucky" },
  // { label: "Login", path: "/login" },
  // { label: "Account", path: "/account" },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h2" sx={{ my: 2, color: "yellow" }}>
        MovieHub
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Login */}
        {!loggedIn && (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to="/login"
            >
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
        {/* Account */}
        {loggedIn && (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to="/account"
            >
              <ListItemText primary="Account" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledNavbar component="nav">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  sm: "block",
                  color: "yellow",
                  fontSize: "2rem",
                },
              }}
            >
              MovieHub
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: "yellow" }}
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
            {/* Login */}
            {!loggedIn && (
              <Button sx={{ color: "yellow" }} component={Link} to="/login">
                Login
              </Button>
            )}
            {/* Account */}
            {loggedIn && (
              <Button sx={{ color: "yellow" }} component={Link} to="/account">
                Account
              </Button>
            )}
          </Box>
        </Toolbar>
      </StyledNavbar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography></Typography>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
