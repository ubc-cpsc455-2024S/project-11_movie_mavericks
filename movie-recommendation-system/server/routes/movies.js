var express = require("express");
var router = express.Router();
var { User, Movie, Watchlist, Review } = require("../schemas");

/* GET movie by tmdb_movie_id */
router.get("/:tmdbID", async (req, res, next) => {
    const tmdbID = req.params.tmdbID;
    try {
        const movie = await Movie.findOne({ tmdb_movie_id: tmdbID });
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

/* Post a review to a movie */
router.post("/review", async (req, res, next) => {
    try {
        const { movieID, reviewID } = req.body;
        const movie = await Movie.findOne({ _id: movieID });
        // Reviews added in reverse chronological order
        movie.reviews.unshift(reviewID);
        movie.save().then(() => res.json(reviewID));
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;