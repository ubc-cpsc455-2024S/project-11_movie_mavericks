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
  const { email, password } = req.body;

  try {
    let user = users.find((user) => user.email === email);

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
        email: email,
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

module.exports = router;
