const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// 1. הוספת מאמר חדש
router.post("/", (req, res) => {
  const { title, content, author } = req.body;
  db.query(
    "INSERT INTO articles (title, content, author) VALUES (?, ?, ?)",
    [title, content, author],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Article added", id: result.insertId });
    }
  );
});

// 2. קבלת רשימה של כל המאמרים
router.get("/", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 3. קבלת מידע על מאמר לפי מזהה
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
});

// 4. מחיקת מאמר לפי מזהה
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM articles WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Article deleted" });
  });
});

// 5. לפי שם מחבר
router.get("/author/:author", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE author = ?",
    [req.params.author],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// 6. מאמרים שנוצרו אחרי תאריך
router.get("/after/:date", (req, res) => {
  db.query(
    "SELECT * FROM articles WHERE created_at > ?",
    [req.params.date],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// 7. מיון לפי תאריך
router.get("/sorted/desc", (req, res) => {
  db.query(
    "SELECT * FROM articles ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// 8. ספירת מאמרים
router.get("/count/all", (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM articles", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// 9. חיפוש לפי מילת מפתח בכותרת
router.get("/search/:keyword", (req, res) => {
  const keyword = `%${req.params.keyword}%`;
  db.query(
    "SELECT * FROM articles WHERE title LIKE ?",
    [keyword],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// 10. מחברים ללא כפילויות
router.get("/distinct/authors", (req, res) => {
  db.query("SELECT DISTINCT author FROM articles", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
