import express from 'express';
import {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getCategories,
  addComment,
  getComments,
  getRelatedArticles,
  getLatestArticle
} from '../controllers/articleController.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/categories', getCategories);
router.get('/latest', getLatestArticle);
router.get('/slug/:slug', getArticleBySlug, (req, res) => res.json(res.article));
router.get('/:id', getArticleById, (req, res) => res.json(res.article));
router.post('/:id/comments', addComment);
router.get('/:id/comments', getComments);
router.get('/related', getRelatedArticles);

export default router;
