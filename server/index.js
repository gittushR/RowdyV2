import app from "./src/app.js";
import { connectToDatabase } from "./src/repo/connection.js";

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Server connected to MongoDB, running on port 5000"));
  })
  .catch((err) => console.error(err));
