import { Schema } from "mongoose";

export interface SerializedUser {
  _id: Schema.Types.ObjectId,
  name: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserType = SerializedUser & Document & {
  password: string;
  serialize(): SerializedUser;
  comparePassword(param: string): boolean;
}
