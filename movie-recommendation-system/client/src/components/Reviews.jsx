import React from "react";
import { useSelector } from "react-redux";

const Reviews = () => {
  const reviews = useSelector((state) => state.user.reviews);
  return (
    <div>
      <Paper elevation={3} sx={{ padding: "50px 30px" }}>
        <Typography variant="h5" gutterBottom>
          My Reviews
        </Typography>
        <List>
          {reviews.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} secondary={item.description} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Reviews;
