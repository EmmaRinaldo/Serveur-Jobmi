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


// Get an article by slug
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'article' });
  }
};

// Get all article slugs
export const getAllArticleSlugs = async (req, res) => {
  try {
    const articles = await Article.find().select('slug');
    const slugs = articles.map(article => article.slug);
    res.json(slugs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des slugs' });
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

// Get the latest article
export const getLatestArticle = async (req, res) => {
  try {
    const latestArticle = await Article.findOne().sort({ createdAt: -1 });
    res.json(latestArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

