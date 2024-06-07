import React from "react";
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';

export default function Recommendation() {
    const recommendations = useSelector(state => state.recommendations)

    const cards = recommendations.map(movie => <Card key={movie.id} movie={movie} />)

    return (
        <>
            <h1>Recommendations</h1>
            <Grid container spacing={2}>
                {cards}
            </Grid>
        </>
    )
}

// TODO
function Card(props) {
    const movie = props.movie
    return (
        <Grid>
            {/* <Item> */}
                <h3>
                    {movie.title}
                    {movie.title != movie.original_title && "(" + movie.original_title + ")"}
                </h3>
                <img src={"https://image.tmdb.org/t/p/w500" + movie["poster_path"]}></img>
            {/* </Item> */}
        </Grid>
    )
}