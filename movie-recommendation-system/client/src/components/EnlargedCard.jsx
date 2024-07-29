import { Button } from "@mui/material";
import React from "react";

const EnlargedCard = ({ movie, onClose }) => {
  return (
    <Card sx={{ color: "white" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2">{movie.overview}</Typography>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnlargedCard;
