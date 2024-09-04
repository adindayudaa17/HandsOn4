const mongodb = require("./db.js");
const userQuery = require("./query.js");
mongodb.connectDB();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// User routes
app.get("/users", (req, res) => {
  userQuery
    .getUser()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/users", (req, res) => {
  const user = req.body;
  userQuery
    .createUser(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  userQuery
    .updateUser(id, user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userQuery
    .deleteUser(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/users/search", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }
  userQuery
    .findByName(name)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Transaction routes
app.get("/transactions", (req, res) => {
  userQuery
    .getTransaction()
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/transactions", (req, res) => {
  const transaction = req.body;
  userQuery
    .createTransaction(transaction)
    .then((transaction) => {
      res.status(201).json(transaction);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const transaction = req.body;
  userQuery
    .updateTransaction(id, transaction)
    .then((transaction) => {
      res.status(200).json(transaction);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  userQuery
    .deleteTransaction(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/transactions/search", (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res
      .status(400)
      .json({ error: "User ID query parameter is required" });
  }
  userQuery
    .findTransactionByUserId(userId)
    .then((transactions) => {
      res.status(200).json(transactions);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});
