const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 3000;

app.use(express.json()); 

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user" }
];

// Rest Endpoints will go below 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/api/users", (req, res) => {
    res.json(users);
  });

  app.get("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });

  app.get("/api/users", (req, res) => {
    const { role } = req.query;
    if (role) {
        return res.json(users.filter(user => user.role === role));
    }
    res.json(users);
});

app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and email are required" });
  
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.put("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
  
    res.json(user);
  });

  app.delete("/api/users/:id", (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "User not found" });
  
    users.splice(index, 1);
    res.json({ message: "User deleted" });
  });