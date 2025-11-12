const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function fixImages() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  const listings = await Listing.find({});

  for (let listing of listings) {
    if (listing.image && typeof listing.image === "object" && listing.image.url) {
      listing.image = listing.image.url;
      await listing.save();
      console.log(`✅ Fixed: ${listing.title}`);
    }
  }

  console.log("All done!");
  mongoose.connection.close();
}

fixImages();
