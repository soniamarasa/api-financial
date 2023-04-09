import mongoose from 'mongoose';
import accountModel from './accountModel';
import cardModel from './cardModel';
import categoryModel from './categoryModel';
import storeModel from './storeModel';

const cardTransactionSchema = mongoose.Schema({
  userId: String,
  description: String,
  obs: String,
  type: String,
  value: Number,
  date: Date,
  effected: Boolean,
  category: categoryModel,
  store: storeModel,
  card: cardModel,
  purchaseDate: Date,
  outputAccount: accountModel,
});

const cardTransactionModel = mongoose.model(
  'cardTransaction',
  cardTransactionSchema
);

export default cardTransactionModel;
