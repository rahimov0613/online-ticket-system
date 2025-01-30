import { User } from '../models/index.js';
import { blacklistedTokens } from '../middlewares/auth.middleware.js';

export const authController = {
  async register(req, res, next) {
    try {
      const body = req.body;
      if (!body.email || !body.password || !body.username) {
        throw new Error('Username, Email and password are required');
      }
      const user = new User(body);

      await user.save();

      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        error.message = 'User already exists';
        error.code = 400;
        res.status(400).json(error);
        return;
      }
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const body = req.body;

      if (!body.username || !body.password) {
        throw new Error('Username and password are required');
      }

      const user = await User.findOne({
        username: body.username,
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await user.matchPassword(body.password);

      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      next(error);
    }
  },
  async profile(req, res, next) {
    try {
      const query = req.query
      if (!query.username || !query.password) {
        throw new Error('Username and password are required');
      }

      const user = await User.findOne({
        username: query.username,
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await user.matchPassword(query.password);

      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  },
  async logout(req, res, next) {
    try {
      const token = req.headers["authorization"];

      if (!token) {
        return res.status(401).json({ message: "Token topilmadi!" });
      }
      blacklistedTokens.add(token);
      res.json({ message: "Siz muvaffaqiyatli chiqdingiz!" });

    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      if (!user) {
        throw new Error('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      res.status(204).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
};