import mongoose from "mongoose";

 function connectDataBase() {
  const uri =
    "mongodb+srv://root:1234@cluster0.9azivoj.mongodb.net/chatter?retryWrites=true&w=majority"; // Replace with your MongoDB connection string

  mongoose.connect(uri);
  
  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("Error connecting to the database:", error);
  });

  db.once("open", () => {
    console.log("Connected to the database");
  });
  return db;
}
const db = connectDataBase();

export default db;