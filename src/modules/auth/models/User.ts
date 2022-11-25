import { Schema, model } from 'mongoose';
import { SerializedUser, UserType } from '../../../types/auth';

import bcryptjs from 'bcryptjs';

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  this.password = bcryptjs.hashSync(this.password, 15);

  next();
});

UserSchema.methods.serialize = function(): SerializedUser {
  return {
    _id: this._id,
    name: this.name,
    phone: this.phone,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
}

UserSchema.methods.comparePassword = function (candidate_password: string): boolean {
  return bcryptjs.compareSync(candidate_password, this.password);
}

export const User = model<UserType>('User', UserSchema);
