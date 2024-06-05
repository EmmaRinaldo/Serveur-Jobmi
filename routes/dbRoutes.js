import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/data', (req, res) => {
  const sql = 'SELECT * FROM table_name';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

export default router;
