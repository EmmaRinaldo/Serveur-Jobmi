import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
  },
  lastName: { 
    type: String,
  },
  email: { 
    type: String, 
    required: [true, "Cet e-mail est déjà enregistré"], 
    unique: [true, "Un email est requis"] 
  },
  city: { 
    type: String 
  },
  password: { 
    type: String,
    required: function() { return !this.googleId; }
   },
  phone: { 
    type: String
  },
  job: { 
    type: String
  },
  googleId: { 
    type: String, unique: true, sparse: true
  },
  profilePicture: { 
    type: String
  }
});

export default mongoose.model('User', userSchema);
