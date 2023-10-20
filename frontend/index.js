const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const handlebars = require("express-handlebars");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const PORT = 5000;

// Load variables
dotenv.config();

// start server
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser("SUD"));
app.use(session({ cookie: { maxAge: 30000000 } })); // Save data on website on next visits

app.use(cors());
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "./layouts/"),
    partialsDir: path.join(__dirname, "./partials/"),
  })
);

app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// This is Front-end index.js
