const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/*const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);*/
const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String},
    brand: { type:  String, required: true },
    price: { type: Number, default: 0, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
   // reviews: [reviewSchema],
  });
  module.exports = Product = mongoose.model("product",  productSchema);