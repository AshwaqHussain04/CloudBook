const connectToMongo = require("./db.js");
const cors = require('cors')
const express = require("express");

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello This Project is working!");
});

app.use("/api/auth", cors(),require("./routes/auth.js"));
app.use("/api/notes", cors(),require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`CloudBook listening on port ${port}`);
});
