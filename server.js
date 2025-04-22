const express = require('express');
const path = require("path");
const { Sequelize, DataTypes } = require('sequelize');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "app")));

// Sequelize setup
const sequelize = new Sequelize('book_management', 'root', 'casterwill19', {
  host: 'localhost',
  dialect: 'mysql'
});

// Book model definition
const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  publication_year: {
    type: DataTypes.INTEGER
  },
  genre: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Test the connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synchronized with database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// API Endpoints
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/books", async (req, res) => {
  try {
    const { title, author, isbn, publication_year, genre } = req.body;
    
    // Validation
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: "Title, author, and ISBN are required" });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      publication_year,
      genre
    });
    
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/books/:id", async (req, res) => {
  try {
    const { title, author, isbn, publication_year, genre } = req.body;
    
    // Validation
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: "Title, author, and ISBN are required" });
    }

    const [updated] = await Book.update({
      title,
      author,
      isbn,
      publication_year,
      genre
    }, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      res.json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});