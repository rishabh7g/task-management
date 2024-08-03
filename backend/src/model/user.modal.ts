// create mongoose schema for user

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['user'] },
    tasks: { type: Array, default: [] },
    refreshToken: { type: String, default: '' },
});

export const UserModel = model('User', userSchema);
