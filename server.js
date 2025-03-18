const express = require('express');
const path = require("path")
const mysql = require('mysql');
//const bcrypt = require('bcrypt');
const cors = require("cors")
const bodyParser = require("body-parser")
//const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "app")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "casterwill19",
  database: "bookdb",
});

db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Connected to MySQL database.");
    }
  });

const JWT_SECRET = 'your_secret_key';

app.get("/books", (req, res) => {
    db.query("SELECT * FROM books", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM books WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

app.post("/books", (req, res) => {
  const { title, author, published_year } = req.body;
  db.query(
    "INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)",
    [title, author, published_year],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Book added successfully", id: result.insertId });
    }
  );
});

app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, published_year } = req.body;
  db.query(
    "UPDATE books SET title = ?, author = ?, published_year = ? WHERE id = ?",
    [title, author, published_year, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Book updated successfully" });
    }
  );
});

app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
      if (err) throw err;
      res.json({ message: "Book deleted successfully" });
    });
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});