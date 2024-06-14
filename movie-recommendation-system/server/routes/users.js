var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");

let users = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST user login */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = users.find((user) => user.username === username);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      res.send("Login successful");
    } else {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      user = {
        username: username,
        password: pass,
      };

      users.push(user);
      res.send("Registration successful");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* PUT username and password */
router.put("/:username", async (req, res) => {
  const { username, password } = req.body;
  const { username: newUsername } = req.params;

  try {
    let user = users.find((user) => user.username === newUsername);

    if (user) {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      user.username = username;
      user.password = pass;

      res.send(user);
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
    const usernameToDelete = users.findIndex(
      (user) => user.username === username
    );

    if (usernameToDelete !== -1) {
      users.splice(userIndex, 1);
      res.send("User deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
