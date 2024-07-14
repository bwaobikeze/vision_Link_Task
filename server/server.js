const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const db = require("./config/db");

app.use(cors());
app.use(express.json());

// Get all points
app.get("/api", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM point ORDER BY name");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single point
app.get("/api/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM point WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a points values
app.patch("/api/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "UPDATE point SET name = $1, x = $2, y = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.x, req.body.y, req.params.id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log([req.body.name, req.body.x, req.body.y, req.params.id]);
    res.status(500).json(error);
  }
});

// delete a point
app.delete("/api/:id", async (req, res) => {
  try {
    const { rows } = await db.query("DELETE FROM point WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// add a new point
app.post("/api/edit", async (req, res) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO point (name, x, y) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.x, req.body.y]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
