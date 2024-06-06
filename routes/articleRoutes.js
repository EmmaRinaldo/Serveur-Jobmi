import express from 'express';
import { getArticles, createArticle, getArticleById, updateArticle, deleteArticle } from '../controllers/articleController.js';

const router = express.Router();

router.get('/articles', getArticles);
router.post('/articles', createArticle);
router.get('/articles/:id', getArticleById, (req, res) => res.json(res.article));
router.patch('/articles/:id', getArticleById, updateArticle);
router.delete('/articles/:id', getArticleById, deleteArticle);

export default router;
