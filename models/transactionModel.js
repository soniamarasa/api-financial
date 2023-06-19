import mongoose from 'mongoose';
import accountModel from './accountModel';
import categoryModel from './categoryModel';
import storeModel from './storeModel';
import tagModel from './tagModel';

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
  tag: tagModel,
  inputAccount: accountModel,
  outputAccount: accountModel,
});

const transactionModel = mongoose.model('transaction', transactionSchema);

export default transactionModel;
