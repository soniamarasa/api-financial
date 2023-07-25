import mongoose from 'mongoose';
import flagModel from './flagModel.js';

const cardSchema = mongoose.Schema({
  userId: String,
  description: String,
  dueDate: Date,
  closingDate: Date,
  accountId: String,
  flag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: flagModel,
  },
  limit: Number,
});

const cardModel = mongoose.model('card', cardSchema);

export default cardModel;
