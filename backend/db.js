const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://aanchalagarwal1401:dffowYTudIZlnZhF@cluster0.ao4pakc.mongodb.net/GoFoodMERN?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log(err);
      else {
        console.log("Connected successfully");
        const fetched_data =await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function (err, data) {
          const food_category =await mongoose.connection.db.collection("food_category");
          food_category.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              // console.log(global.food_items);
              global.food_category = catData;
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDB;
