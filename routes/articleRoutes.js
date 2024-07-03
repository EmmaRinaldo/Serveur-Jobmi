import express from 'express';
import {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getCategories,
  getRelatedArticles,
  getLatestArticle,
  getAllArticleSlugs
} from '../controllers/articleController.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/categories', getCategories);
router.get('/latest', getLatestArticle);
router.get('/slug/:slug', getArticleBySlug);
router.get('/slugs', getAllArticleSlugs);
router.get('/:id', getArticleById, (req, res) => res.json(res.article));
router.get('/related', getRelatedArticles);
// router.post('/:id/comments', addComment);
// router.get('/:id/comments', getComments);

export default router;
