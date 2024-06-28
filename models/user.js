import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String },
  password: { type: String },
  age: { type: Number },
  phone: { type: String },
  job: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  profilePicture: { type: String }
});

export default mongoose.model('User', userSchema);
