import express from 'express';
import { registerUser, loginUser, googleSignIn, getUserByEmail } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-signin', googleSignIn);
router.get('/:email', getUserByEmail);
router.put('/:email', updateUser);

export default router;
