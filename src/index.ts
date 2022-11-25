import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose, { Schema } from 'mongoose';
import router from './router';

config();

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      _id: Schema.Types.ObjectId,
      name: string,
      phone: string;
      email: string,
      createdAt: Date;
      updatedAt: Date;
    };
  }
}

mongoose.connect(String(process.env.MONGO_DB)).then(() => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const PORT = process.env.PORT || 5000;

  app.use(router);

  app.listen(PORT, () => {
    console.log(`🚀 Running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log(`DB connection error: ${err}`);
});