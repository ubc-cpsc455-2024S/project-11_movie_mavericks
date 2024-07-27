var express = require("express");
var router = express.Router();
var { Movie } = require("../schemas");

/* GET movie by tmdb_movie_id */
router.get("/:tmdbID", async (req, res) => {
  const tmdbID = req.params.tmdbID;
  try {
    const movie = await Movie.findOne({ tmdb_movie_id: tmdbID });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json(`${tmdbID} not in our database`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { tmdb_movie_id, title } = req.body;
    const newMovie = new Movie({
      tmdb_movie_id: tmdb_movie_id,
      title: title,
      reviews: [],
    });
    newMovie.save().then((movie) => res.json(movie));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* Save review to a movie */
router.patch("/review", async (req, res) => {
  try {
    const { movieID, reviewID } = req.body;
    const movie = await Movie.findOne({ _id: movieID });
    movie.reviews.unshift(reviewID);
    movie.save().then(() => res.json(reviewID));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.delete("/:tmdbID", async (req, res) => {
  const tmdbID = req.params.tmdbID;

  try {
    const movieToDelete = await Movie.deleteOne({ tmdb_movie_id: tmdbID });

    if (movieToDelete.deletedCount === 1) {
      res.status(204).send("Movie deleted successfully");
    } else {
      res.status(404).json({ msg: "movie not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
