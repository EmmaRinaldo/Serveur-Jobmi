import express from 'express';
import {
  getArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getCategories,
  addComment,
  getComments,
  getRelatedArticles
} from '../controllers/articleController.js';

const router = express.Router();

router.get('/', getArticles);
router.post('/', createArticle);
router.get('/categories', getCategories);
router.get('/:id', getArticleById, (req, res) => res.json(res.article));
router.patch('/:id', getArticleById, updateArticle);
router.delete('/:id', getArticleById, deleteArticle);
router.post('/:id/comments', addComment);
router.get('/:id/comments', getComments);
router.get('/related', getRelatedArticles);

export default router;
