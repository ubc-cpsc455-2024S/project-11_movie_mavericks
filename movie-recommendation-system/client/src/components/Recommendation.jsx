import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function Recommendation() {
  const recommendations = useSelector((state) => state.recommendations);

  const cards = recommendations.map((movie) => (
    <GridCard key={movie.id} movie={movie} />
  ));

  return (
    <>
      <h1>Recommendations</h1>
      <Grid container spacing={3}>
        {cards}
      </Grid>
    </>
  );
}

function GridCard(props) {
  const movie = props.movie;
  return (
    <Grid item xs={6} sm={3}>
      <Card sx={{ backgroundColor: "#37474F", color: "white" }}>
          <CardMedia
            component="img"
            style={{ height: "300px", objectFit: "cover" }}
            image={"https://image.tmdb.org/t/p/w500" + movie["poster_path"]}
            alt={movie.title}
          />
          <CardContent
            style={{
              height: "100px",
              alignContent: "center",
              overflowY: "auto",
            }}
          >
            <Typography variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography gutterBottom>
              {movie.title != movie.original_title &&
                "(" + movie.original_title + ")"}
            </Typography>
            <Stack style={{padding: "5px"}}>
              <Button style={{padding: "5px", color: "white" }} variant="outlined">Review</Button>
            </Stack>
            <Stack style={{padding: "5px"}}>
              <Button style={{padding: "5px", color: "white"}} variant="outlined">Add to watchlist</Button>
            </Stack>
            <Stack style={{padding: "5px"}}>
              <Button style={{padding: "5px", color: "white"}} variant="outlined">Learn More</Button>
            </Stack>
          </CardContent>
      </Card>
    </Grid>
  );
}
