const mongoose = require("mongoose");
const initData =require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";


async function main() {
    try {
      await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to DB");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }

  main();
  

  const initDB = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error during initialization:", err);
    }
};

initDB();