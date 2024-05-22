import mongoose from "mongoose";
import config from "./config";
import app from "./app"; 
import "dotenv";

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
     const port = process.env.PORT || config.port;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main();
