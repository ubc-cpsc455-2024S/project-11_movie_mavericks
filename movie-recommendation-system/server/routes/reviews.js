var express = require("express");
var router = express.Router();
var { User, Review } = require("../schemas");

/* GET review */
router.get("/:reviewID", async (req, res) => {
  const reviewID = req.params.reviewID;
  try {
    const review = await Review.findOne({ _id: reviewID });
    if (review) {
      const user = await User.findOne({ _id: review.user_id });
      const username = user ? user.username : "deleted";
      res.json({ ...review.toObject(), username: username });
    } else {
      res.status(404).send("Review not found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, movie_id, title, rating, comment } = req.body;
    const newReview = new Review({
      user_id: user_id,
      movie_id: movie_id,
      title: title,
      rating: rating,
      comment: comment,
    });
    newReview.save().then((review) => res.json(review));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.patch("/:reviewID", async (req, res) => {
  const reviewID = req.params.reviewID;
  const { rating, comment } = req.body;

  try {
    const reviewToPatch = await Review.findOne({ _id: reviewID });
    if (reviewToPatch) {
      reviewToPatch.rating = rating;
      reviewToPatch.comment = comment;
      reviewToPatch.save().then((review) => res.json(review));
    } else {
      res.status(404).send("Review not found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:reviewID", async (req, res) => {
  const reviewID = req.params.reviewID;

  try {
    const reviewToDelete = await Review.deleteOne({ _id: reviewID });

    if (reviewToDelete.deletedCount === 1) {
      res.status(204).send("Review deleted successfully");
    } else {
      res.status(404).json({ msg: "review not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
