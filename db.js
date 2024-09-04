const mongoose = require("mongoose");
const uri =
  "mongodb+srv://adindayudaa17:jP0E2vQ9C3fLMomU@cluster0.2v7ps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to db");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully");
  } catch (error) {
    console.log("MongoDB disconnection error:", error);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  disconnectDB,
};
