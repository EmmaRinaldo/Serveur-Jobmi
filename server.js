const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    const response = await fetch('https://api.sendinblue.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY  // Utiliser la clé API depuis le .env
      },
      body: JSON.stringify({
        email: email,
        listIds: [parseInt(process.env.LIST_ID, 10)],  // Utiliser l'ID de la liste depuis le .env
        updateEnabled: true
      })
    });
    const data = await response.json();

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
