const jwt = require("jsonwebtoken");

const JWT_SECRET = "asecretpassword";

const fetchuser = (req, res, next) => {
  // get the user from the JWT token and add the id to the req object
  const token = req.header("authtoken");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please Authenticate with a valid Token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = { id: data.id };
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please Authenticate with a valid Token" });
  }
};

module.exports = fetchuser;
