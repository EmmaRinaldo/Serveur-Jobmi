import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000, // 10 secondes
  acquireTimeout: 10000, // 10 secondes
  timeout: 60000, // 1 minute
});

db.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err);
      throw err;
    }
    console.log('Connecté à la base de données MySQL');
  });
  
  db.on('error', (err) => {
    console.error('Erreur dans la connexion MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
  
  function handleDisconnect() {
    db.connect((err) => {
      if (err) {
        console.error('Erreur de reconnexion à la base de données:', err);
        setTimeout(handleDisconnect, 2000); // Attendre 2 secondes avant de réessayer
      } else {
        console.log('Reconnecté à la base de données MySQL');
      }
    });
  }
  
  export default db;
