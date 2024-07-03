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



// Fonction de connexion via Google
export const googleSignIn = async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (!user) {
      // Créer un nouvel utilisateur s'il n'existe pas
      user = new User({
        email,
        username: name,
        profilePicture: picture,
      });

      await user.save();
    }

    // Retourner l'utilisateur
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la connexion via Google' });
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
