var seeder = require("mongoose-seed");
const dotenv = require("dotenv");
const { categories_seed_data } = require("./data_seeds/initial_categories.js");

dotenv.config();

//seed data
const data = [categories_seed_data];

// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGO_URI, function () {
  // Load Mongoose models
  seeder.loadModels(["./models/lotto_category.js"]);

  // Clear specified collections
  seeder.clearModels(["Category"], function () {
    console.log("--SEEDING START--");
    console.log(categories_seed_data);

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
    console.log("--SEEDING END--");
  });
});
