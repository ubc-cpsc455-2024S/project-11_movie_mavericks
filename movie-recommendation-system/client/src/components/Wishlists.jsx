import React from "react";
import { useSelector } from "react-redux";

const Wishlists = () => {
  const wishlists = useSelector((state) => state.user.wishlists);
  return (
    <Paper elevation={4} sx={{ padding: "50px 30px" }}>
      <Typography variant="h5" gutterBottom>
        My Wishlists
      </Typography>
      <List>
        {wishlists.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Wishlists;
