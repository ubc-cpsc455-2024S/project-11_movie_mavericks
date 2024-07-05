var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlists: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Watchlist",
  },
  reviews: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Review",
  },
});

const movieSchema = new mongoose.Schema({
  tmdb_movie_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  reviews: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Review",
    required: true,
  },
});

const watchlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  movies: {
    type: [Number],
    ref: "Movie",
  },
});

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  movie_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Movie",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Movie = mongoose.model("Movie", movieSchema);
const Watchlist = mongoose.model("Watchlist", watchlistSchema);
const Review = mongoose.model("Review", reviewSchema);

module.exports = {
  User,
  Movie,
  Watchlist,
  Review,
};
