import Article from '../models/article.js';

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

export const deleteArticle = async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
