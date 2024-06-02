import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configuration CORS pour permettre toutes les origines
app.use(cors());
app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  console.log(`Attempting to subscribe email: ${email}`);

  try {
    const response = await fetch('https://api.sendinblue.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.LIST_ID, 10)],
        updateEnabled: true
      })
    });

    const data = await response.json();

    console.log('Response from Sendinblue:', data);

    if (!data.code) {
      res.json({ message: 'Inscription réussie!' });
    } else {
      res.status(400).json({ message: 'Erreur: ' + data.message });
    }
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Une erreur est survenue. Veuillez réessayer.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
