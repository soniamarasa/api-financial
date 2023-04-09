import mongoose from 'mongoose';
import accountModel from './accountModel';
import categoryModel from './categoryModel';
import storeModel from './storeModel';

const transactionSchema = mongoose.Schema({
  userId: String,
  description: String,
  obs: String,
  type: String,
  value: Number,
  date: Date,
  effected: Boolean,
  category: categoryModel,
  store: storeModel,
  inputAccount: accountModel,
  outputAccount: accountModel,
});

const transactionModel = mongoose.model('transaction', transactionSchema);

export default transactionModel;
