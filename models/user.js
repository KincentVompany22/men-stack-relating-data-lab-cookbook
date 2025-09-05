const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    enum: ["Grain", "Canned Good", "Spice", "Snack", "Other"]
  },
  quantity: {
    type: Number,
  },
  unit: {
    type: String,
    enum: ["kgs", "lbs", "oz", "cups", "units"]
  },
  expirationDate: {
    type: Date,
  }
})


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema], // embed foodSchema here
});




const User = mongoose.model('User', userSchema);

module.exports = User;
