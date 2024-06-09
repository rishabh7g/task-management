const bodyParser = require("body-parser");
const express = require("express");

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const swaggerSetup = require("./swagger");

const app = express();

app.use(bodyParser.json());
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRoutes);
app.use("/events", eventRoutes);

app.use((error, req, res) => {
  const status = error.statusCode || 500;
  const message = error.message || "An unexpected error occurred.";
  res.status(status).json({ error: message });
});

swaggerSetup(app);

const PORT = process.env.PORT || 8090;
app.listen(PORT);
