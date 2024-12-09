import mongoose from "mongoose";

import { MONGODB_URI } from "./environment.js";
import { DB_NAME } from "../constants/index.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `Database connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Database connection error: ${error}`);
    throw error;
  }
};

export default connectDB;
