var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
var {User, Movie, Watchlist, Review} = require("../schemas");

const uri = "mongodb+srv://moviehub:cs455@moviehub.vekjlyg.mongodb.net/?retryWrites=true&w=majority&appName=MovieHub";

function connect() {
  try {
    mongoose.connect(uri);
    console.log("Successful connection to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

let users = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET username by user id */
router.get("/:userID", async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const user = await User.findOne({ '_id': userID });
    res.json(user.username)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

/* POST user login */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ 'username': username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      var userObj = user.toObject();
      delete userObj.password;
      res.json(userObj);
    } else {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      const newUser = new User({
        username: username,
        password: pass,
        watchlists: [],
        reviews: []
      });

      newUser.save();
      res.send(`Registration successful for ${username}`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* PUT username and password */
router.put("/:username", async (req, res) => {
  const { username, password } = req.body;
  const { username: oldUsername } = req.params;

  try {
    const user = await User.findOne({ 'username': oldUsername });

    if (user) {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      user.username = username;
      user.password = pass;

      user.save();

      res.send(username);
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* DELETE user account */
router.delete("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const usernameToDelete = await User.deleteOne({ 'username': username });

    if (usernameToDelete.deletedCount === 1) {
      res.send("User deleted successfully");
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* A user post a comment */
router.post("/review", async (req, res, next) => {
  try {
    const { userID, reviewID } = req.body;
    const user = await User.findOne({ _id: userID });
    // Reviews added in reverse chronological order
    user.reviews.unshift(reviewID);
    user.save().then(() => res.json(reviewID));
} catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
}
})

module.exports = router;
