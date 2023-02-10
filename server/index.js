const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const { login, register } = require("./controllers/auth.js");
const { verifyToken } = require("./middleware/auth.js");
const { createPost } = require("./controllers/posts.js");
const User = require("./models/User");
const Post = require("./models/posts");
const { users, posts } = require("./data/index");

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "public/assets")));

// STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename);
  },
});
const upload = multer({ storage });

// Routes
app.post("/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), verifyToken, createPost);
app.use("/user", require("./routes/User"));
app.use("/posts", require("./routes/posts"));

// DATABASE SETUP
const PORT = process.env.PORT || 2980;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
      // ADD DATA ONE TIME
      // User.insertMany(users);
      // Post.insertMany(posts);
    })
  )
  .catch((err) => console.log(`${err} did not connect!`));
