var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema);

let users = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST user login */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({'username': username});

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      res.send("Login successful"); 
    } else {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);
    
      const newUser = new User({
        username: username,
        password: pass
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
    const user = await User.findOne({'username': oldUsername});

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
    const usernameToDelete = await User.deleteOne({'username': username});

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

module.exports = router;
