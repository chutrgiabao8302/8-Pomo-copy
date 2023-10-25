import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import session from "express-session";
import cookieParser from "cookie-parser";
const PORT = 3000;

// Load variables
dotenv.config();

// start server
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser("SUD"));
app.use(session({ cookie: { maxAge: 30000000 } })); // Save data on website on next visits
db.connect();

import accountRouter from "./resources/Account/router.js";
app.use("/account", accountRouter);

import taskRouter from "./resources/Task/router.js";
app.use("/task", taskRouter);

app.get("/", )

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// This is Back-end index.js
