import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import zod from 'zod';

// User modeli uchun validatsiya skhema
export const UserValidationSchema = zod.object({
  username: zod.string().min(3).max(255),
  email: zod.string().email(),
  password: zod.string().min(6),
});


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

// Parolni saqlashdan oldin hash qilish
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Parolni solishtirish metodi
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

export const User = model('User', userSchema);