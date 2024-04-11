import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRotue from "./routes/auth.route.js";

const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials }));
app.use(express.json());

app.use("/api/auth", authRotue);

app.listen(8000, () => {
  console.log("Server running on 8000");
});
