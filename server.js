import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dbRoutes from './routes/dbRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

dotenv.config();

const app = express();

// Configuration CORS pour permettre toutes les origines
app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes
app.use('/api/db', dbRoutes);
app.use('/api/newsletter', newsletterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
