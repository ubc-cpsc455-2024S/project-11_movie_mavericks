import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const Wishlists = () => {
  const wishlists = useSelector((state) => state.user.watchlists);
  return (
    <Paper elevation={4} sx={{ padding: "50px 30px" }}>
      <Typography variant="h5" gutterBottom>
        My Wishlists
      </Typography>
      <List>
        {wishlists.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item}>{console.log(item)}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Wishlists;
