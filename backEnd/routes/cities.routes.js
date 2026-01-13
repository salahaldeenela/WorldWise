import express from "express";
import { db } from "../dp.js"; // keep your dp.js name

const router = express.Router();

/* =====================
   GET ALL CITIES
===================== */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Cities ORDER BY Date DESC");

    const cities = rows.map((c) => ({
      id: c.id,
      cityName: c.City_name,
      date: c.Date,
      notes: c.Notes,
      position: {
        lat: Number(c.Lat),
        lng: Number(c.Lng),
      },
    }));
    console.log(cities)
    res.json(cities);
  } catch (err) {
    console.error("Get cities:", err);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Cities WHERE id=?", [
      req.params.id,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ error: "City not found" });

    const c = rows[0];

    res.json({
      id: c.id,
      cityName: c.City_Name,
      date: c.Date,
      notes: c.Notes,
      position: {
        lat: Number(c.Lat),
        lng: Number(c.Lng),
      },
    });
  } catch (err) {
    console.error("Get city:", err);
    res.status(500).json({ error: "Failed to fetch city" });
  }
});

/* =====================
   CREATE CITY
===================== */
router.post("/", async (req, res) => {
  const { cityName, lat, lng, date, notes } = req.body;

  if (!cityName || lat === undefined || lng === undefined)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    // Convert JS date / ISO string to MySQL DATETIME
    let mysqlDate = null;

    if (date) {
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }

      // Format → YYYY-MM-DD HH:MM:SS
      mysqlDate = d.toISOString().slice(0, 19).replace("T", " ");
    } else {
      // Default to now
      const d = new Date();
      mysqlDate = d.toISOString().slice(0, 19).replace("T", " ");
    }

    const [result] = await db.query(
      "INSERT INTO Cities (City_Name, Lat, Lng, Date, Notes) VALUES (?, ?, ?, ?, ?)",
      [cityName, lat, lng, mysqlDate, notes || ""]
    );

    const [rows] = await db.query("SELECT * FROM Cities WHERE id=?", [
      result.insertId,
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Create city:", err);
    res.status(500).json({ error: "Failed to create city" });
  }
});

/* =====================
   DELETE CITY
===================== */
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM Cities WHERE id=?", [req.params.id]);
    res.json({ message: "City deleted" });
  } catch (err) {
    console.error("Delete city:", err);
    res.status(500).json({ error: "Failed to delete city" });
  }
});

export default router;
