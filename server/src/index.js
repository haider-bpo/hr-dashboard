import connectDB from "./config/db.js";
import app from "./app.js";

import { PORT } from "./config/environment.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`mongodb connection error: ${err}`);
  });
