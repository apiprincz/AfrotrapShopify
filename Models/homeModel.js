import mongoose from "mongoose";

/* WinnersSchema will correspond to a collection in your MongoDB database. */
const homeSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
    trim: true,
  },
  images: {
    type: Array,
  },
  category: {
    type: Array,
  },
  details: {
    type: Array,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  colors: {
    type: Array,
  },
  inStock: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: "Dallas Texas",
  },
});

module.exports = mongoose.models.home || mongoose.model("home", homeSchema);
