const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const db = require("../config/db");

app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
    try { 
        const { rows } = await db.query('SELECT * FROM point');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
