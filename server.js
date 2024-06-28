import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import articleRoutes from './routes/articleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Configuration CORS pour permettre toutes les origines
app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
