import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;


export const registerUser = async (req, res) => {
  try {
    const { firstName = '', lastName = '', email, city = '', password, phone = '', job = '', googleId = '', profilePicture = '' } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'L\'utilisateur existe déjà !' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Create a new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      city,
      password: hashedPassword,
      phone,
      job,
      googleId,
      profilePicture
    });

    // Save new User
    await newUser.save();

    // Send a success message
    res.status(201).json({ message: 'Utilisateur enregistré!', user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de l\'inscription de l\'utilisateur' });
  }
};



// Fonction de connexion de l'utilisateur
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });
    }

    // Comparer le mot de passe
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });
    }

    // Retourner l'utilisateur
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};



// Connexion Google de l'utilisateur
export const googleSignIn = async (req, res) => {
  const { email, googleId, name, picture } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        googleId,
        firstName: name?.split(' ')[0] || '',
        lastName: name?.split(' ')[1] || '',
        city: '',
        password: '',
        phone: '',
        job: '',
        profilePicture: picture || ''
      });

      await user.save();
    }

    res.status(200).json({ message: 'Connexion réussie', user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la connexion Google' });
  }
};





// Fonction pour obtenir un utilisateur par email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Trouver l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Retourner l'utilisateur
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};
