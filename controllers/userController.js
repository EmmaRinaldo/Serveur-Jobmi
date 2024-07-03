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



// Connexion de l'utilisateur
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    res.status(200).json({ message: 'Connexion réussie', user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
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





// Récupérer les informations de l'utilisateur
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des informations de l\'utilisateur' });
  }
};
