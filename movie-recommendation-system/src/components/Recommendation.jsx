import React from "react";
import { useSelector } from "react-redux";

export default function Recommendation() {
    const recommendations = useSelector(state => state.recommendations)

    const cards = recommendations.map(movie => <Card key={movie.id} movie={movie} />)

    return (
        <>
            <h1>Recommendations</h1>
            {cards}
        </>
    )
}

function Card(props) {
    return (
        <h2>Placeholder {props.movie.id}</h2>
    )
}