import "dotenv/config";
import app from "./app";
import connectDB from "./configs/db";

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log("Server failed to start");
    process.exit(1);
  });
