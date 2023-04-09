import mongoose from 'mongoose';
import flagModel from './flagModel';

const cardSchema = mongoose.Schema({
  userId: String,
  description: String,
  dueDate: Date,
  closingDate: Date,
  accountId: String,
  flag: flagModel,
  limit: Number,
});

const cardModel = mongoose.model('card', cardSchema);

export default cardModel;
