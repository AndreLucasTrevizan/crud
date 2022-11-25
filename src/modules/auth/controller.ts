import { Request, Response } from 'express';
import { User } from './models/User';

import jwt from 'jsonwebtoken';

import { config } from 'dotenv';

config();

const {
  SECRET
} = process.env;

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const exists = await User.findOne({ email });

    if (!exists) {
      const user = await User.create(req.body);

      return res.status(201).json({ _id: user._id });
    }

    return res.status(404).json({ message: 'Email já está em uso.' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateName = async (
  req: Request,
  res: Response
) => {
  try {
    await User.findOneAndUpdate({
      _id: req.user._id,
    }, {
      $set: {
        name: req.body.name
      }
    });

    return res.json({ message: 'Name updated.' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updatePhone = async (
  req: Request,
  res: Response
) => {
  try {
    await User.findOneAndUpdate({
      _id: req.user._id,
    }, {
      $set: {
        phone: req.body.phone
      }
    });

    return res.json({ message: 'Phone updated.' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateEmail = async (
  req: Request,
  res: Response
) => {
  try {
    await User.findOneAndUpdate({
      _id: req.user._id,
    }, {
      $set: {
        email: req.body.email
      }
    });

    return res.json({ message: 'Email updated.' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getMe = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(req.user._id);

    return res.json({ ...user?.serialize() });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email, password
    } = req.body;

    const exists_user = await User.findOne({ email });

    if (exists_user && exists_user.comparePassword(password)) {
      const token = jwt.sign(exists_user.serialize(), String(SECRET));

      return res.json({...exists_user.serialize(), token});
    }

    return res.status(404).json({ message: 'Email ou senha inválidos'});
  } catch (error) {
    return res.status(500).json({ error });
  }
};
