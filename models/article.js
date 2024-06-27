import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  metaDescription: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageCover: { type: String, required: true },
  imageAlt: { type: String, required: true },
  readingTime: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true}],
  datePublished: { type: String, required: true },
}, { timestamps: true });


const Article = mongoose.model('Article', articleSchema);

export default Article;
