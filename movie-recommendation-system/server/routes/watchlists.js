var express = require("express");
var router = express.Router();
var { Watchlist } = require("../schemas");

/* GET all watchlists */
router.get("/:userID", function (req, res) {
  const userID = req.params.userID;

  try {
    Watchlist.find({ user_id: userID }).then((watchlists) =>
      res.json(watchlists)
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* POST create a new watchlist */
router.post("/", async (req, res) => {
  try {
    const { user_id, name } = req.body;
    const newWatchlist = new Watchlist({
      user_id: user_id,
      name: name,
      movies: [],
    });
    newWatchlist.save().then((watchlist) => res.json(watchlist));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* DELETE watchlist */
router.delete("/:watchlistID", async (req, res) => {
  const watchlistID = req.params.watchlistID;
  try {
    const result = await Watchlist.deleteOne({ _id: watchlistID });

    if (result.deletedCount === 1) {
      res.json({ msg: "Watchlist deleted successfully" });
    } else {
      res.status(404).json({ msg: "Watchlist not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* DELETE all watchlists */
router.delete("/", async (req, res) => {
  try {
    const result = await Watchlist.deleteMany({});
    if (result.deletedCount > 0) {
      res.json({ msg: "All watchlists deleted successfully" });
    } else {
      res.status(404).json({ msg: "No watchlists found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* PUT edit existing watchlist */
router.put("/:watchlistID", async (req, res) => {
  const watchlistID = req.params.watchlistID;
  const { name } = req.body;
  try {
    const result = await Watchlist.findOneAndUpdate(
      { _id: watchlistID },
      { name: name }
    );
    if (result) {
      res.json({ msg: "Watchlist updated successfully" });
    } else {
      res.status(404).json({ msg: "Watchlist not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* POST add movie to watchlist */
router.post("/:watchlistID/movies", async (req, res) => {
  const watchlistID = req.params.watchlistID;
  const { movie_id } = req.body;
  try {
    const watchlist = await Watchlist.findOne({ _id: watchlistID });

    if (watchlist) {
      watchlist.movies.push(movie_id);
      await watchlist.save();
      res.json(watchlist);
    } else {
      res.status(404).json({ msg: "Watchlist not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* DELETE movie from watchlist */
router.delete("/:watchlistID/movies/:movieID", async (req, res) => {
  const watchlistID = req.params.watchlistID;
  const movieID = req.params.movieID;
  try {
    const watchlist = await Watchlist.findOne({ _id: watchlistID });
    if (watchlist) {
      const index = watchlist.movies.indexOf(movieID);
      if (index > -1) {
        watchlist.movies.splice(index, 1);
        await watchlist.save();
        res.json(watchlist);
      } else {
        res.status(404).json({ msg: "Movie not found in watchlist" });
      }
    } else {
      res.status(404).json({ msg: "Watchlist not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
