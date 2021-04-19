import mongoose from "mongoose";
// require("dotenv").config({ path: "ENV_FILENAME" });
import dotenv from "dotenv";
// require("dotenv").config();
// const env = require("../env-config.js");

const dbConnect = () => {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  dotenv.config({ path: "ENV_FILENAME" });

  return (
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
      auth: {
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASS,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    (err) => {
      if (err) throw err;
      console.log("connected to mongodb");
    }
  );
};

export default dbConnect;
