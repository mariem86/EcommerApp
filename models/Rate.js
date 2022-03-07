const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  rating: {
    type: Number,
    
  },
})

module.exports = Rate = mongoose.model("rate", RateSchema);