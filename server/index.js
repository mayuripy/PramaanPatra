import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { User } from "./models/auth.js";
import authRoute from "./routes/signUp.js";
import { aadharDetails } from "./API/aadharDetails.js";
import aadharRoute from "./routes/aadhar.js";
// mongodb://localhost:27017
mongoose
  .connect("mongodb+srv://mayuri:mayuri@cluster0.xv0e6c4.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
// console.log(process.env.SESSIONSECRET)
const session_config = {
  // secret: process.env.SESSIONSECRET,
  secret: "MINU",
  resave: true,
  saveUninitialized: true,
  name: "session",
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(session_config));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/auth", authRoute);
app.use("/", aadharRoute);
app.get("/aadharapi", (req, res) => res.send(aadharDetails));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
