import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
