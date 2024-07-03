import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;


export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, city, password, phone } = req.body;

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
