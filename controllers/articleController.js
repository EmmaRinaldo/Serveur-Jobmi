import Article from '../models/article.js';
import Comment from '../models/comment.js';

// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get an article by ID
export const getArticleById = async (req, res, next) => {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.article = article;
  next();
};

// Create an article
export const createArticle = async (req, res) => {
  const { title, content, author, tags, category, coverImage, excerpt, published } = req.body;

  const article = new Article({
    title,
    content,
    author,
    tags,
    category,
    coverImage,
    excerpt,
    published
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an article
export const updateArticle = async (req, res) => {
  const { title, content, author, tags, category, coverImage, excerpt, published } = req.body;

  if (title != null) res.article.title = title;
  if (content != null) res.article.content = content;
  if (author != null) res.article.author = author;
  if (tags != null) res.article.tags = tags;
  if (category != null) res.article.category = category;
  if (coverImage != null) res.article.coverImage = coverImage;
  if (excerpt != null) res.article.excerpt = excerpt;
  if (published != null) res.article.published = published;

  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an article
export const deleteArticle = async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Article.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a comment to an article
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({ articleId: req.params.id, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for an article
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get related articles
export const getRelatedArticles = async (req, res) => {
  try {
    const { currentArticleId, category } = req.query;
    const relatedArticles = await Article.find({
      _id: { $ne: currentArticleId },
      category
    }).limit(3);
    res.json(relatedArticles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
