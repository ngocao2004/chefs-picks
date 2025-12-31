const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables before other imports that depend on them
dotenv.config();
const { connectDB } = require("./config/db-config");
const authRoutes = require("./routes/auth-routes");
const favoriteRoutes = require("./routes/favorite-routes");
const dishRoutes = require("./routes/dish-router");
const categoryRoutes = require("./routes/category-routes");
const suggestionRouter = require("./routes/suggestions-routes");
const historyRoutes = require("./routes/historyRoutes");
const omakaseRoutes = require("./routes/omakase-routes");
const lunchScheduleRoutes = require("./routes/lunch-schedule-routes");
const app = express();
const PORT = process.env.PORT || 5000;


// Allow configuring allowed client origin(s) via environment variable `CLIENT_URL`.
// Accept a single origin or comma-separated origins. Defaults to localhost dev URL.
const CLIENT_URL = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Handle Private Network preflight requests (when a public origin tries to reach
// a private address). Most deployments shouldn't need this, but respond to
// the browser preflight if requested.
// Use a valid path pattern for Express/`path-to-regexp` by matching all paths.
// Using '/*' avoids a PathError on some platform versions.
// Global OPTIONS handler to respond to preflight requests and allow
// Access-Control-Allow-Private-Network when requested. Using a middleware
// instead of `app.options('/*', ...)` avoids path-to-regexp errors on some
// platform/node module versions.
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    if (req.headers["access-control-request-private-network"]) {
      res.setHeader("Access-Control-Allow-Private-Network", "true");
    }
  }
  next();
});

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suggestions", suggestionRouter);
app.use("/api/omakase", omakaseRoutes); 
app.use("/api/history", historyRoutes);
app.use("/api/lunch-schedule", lunchScheduleRoutes);

app.get("/", (req, res) => {
  res.send("Hello! Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
