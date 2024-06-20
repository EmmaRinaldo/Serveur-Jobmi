const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  metaDescription: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageCover: { type: String, required: true },
  readingTime: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
