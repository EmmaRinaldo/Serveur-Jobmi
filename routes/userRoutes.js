import express from 'express';
import {
  register,
  login,
  googleLogin,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, upload.single('profilePicture'), updateUserProfile);

export default router;
