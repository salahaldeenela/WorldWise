import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../dp.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("THIS IS THE REQUEST", req);
  console.log("THIS IS THE RESOLUTION", res);

  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const [exists] = await db.query("SELECT id FROM Users WHERE email=?", [
      email,
    ]);

    if (exists.length > 0)
      return res.status(400).json({ error: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO Users (name, email, pasword) VALUES (?, ?, ?)",
      [name, email, hash]
    );

    res.json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("LOGIN HIT");
  console.log("BODY:", req.body);

  try {
    const { email, password } = req.body;

    console.log("Email:", email);

    const [rows] = await db.query(
      "SELECT id, name, email, pasword FROM Users WHERE email=?",
      [email]
    );

    console.log("DB rows:", rows);

    if (rows.length === 0) {
      console.log("No user found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    console.log("Hash from DB:", user.pasword);

    const ok = await bcrypt.compare(password, user.pasword);
    console.log("Password match:", ok);

    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("JWT created");

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN CRASH:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

export default router;
