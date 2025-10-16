const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "asecretpassword";
//Route : 1 Create a user using POST "./api/auth/createuser" No login required
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("The password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if user already exists
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      console.log("Success");
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

//Route 2 : Authenticate a user using POST "./api/auth/login"
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Please Enter your Password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "PLease try again with the correct credentials" });
      }

      const comparePassword = await bcrypt.compare(password, user.password[0]);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "PLease try again with the correct credentials" });
      }

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (errors) {
      console.error(errors);
      res.status(500).json({ error: "Interal Server Error" });
    }
  }
);

//Route 3 : Get Loggedin User Details using GET "./api/auth/getuser"

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (errors) {
    console.error(errors);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
