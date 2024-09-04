const mongoose = require("mongoose");
const schema = require("./schema");

const User = mongoose.model("User", schema.userSchema, "users");
const Transaction = mongoose.model(
  "Transaction",
  schema.transactionSchema,
  "transaction"
);

// User queries
async function getUser() {
  return User.find();
}

async function createUser(userData) {
  return User.create(userData);
}

async function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { new: true });
}

async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

async function findByName(name) {
  return User.find({ name: name });
}

// Transaction queries
async function getTransaction() {
  return Transaction.find();
}

async function createTransaction(transactionData) {
  return Transaction.create(transactionData);
}

async function updateTransaction(id, transactionData) {
  return Transaction.findByIdAndUpdate(id, transactionData, { new: true });
}

async function deleteTransaction(id) {
  return Transaction.findByIdAndDelete(id);
}

async function findTransactionByUserId(userId) {
  return Transaction.find({ userId: userId });
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  findByName,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  findTransactionByUserId,
};
