import express from "express";
import "dotenv/config.js";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Express Configs
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT;

// Express Middleware
app.use("/posts", postRouter);
app.use("/users", userRouter);

// Initiating Database Connection
async function run() {
  await mongoose.connect(process.env.MONGO_URI);
}
run()
  .then((d) => {
    console.log("Connected to DB");
    //Listener
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
    console.log("Unable to connect to Database");
  });
