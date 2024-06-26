import mongoose from "mongoose";
import config from "./config";
import app from "./app"; 

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port || 8080, () => {
      console.log(`Server is running on port ${config.port|| 8080}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main();
