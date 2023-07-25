import mongoose from 'mongoose';
// import accountModel from './accountModel';
// import categoryModel from './categoryModel';
// import storeModel from './storeModel';
// import tagModel from './tagModel';

const transactionSchema = mongoose.Schema({
  userId: String,
  description: String,
  obs: String,
  type: Number,
  value: Number,
  date: Date,
  effected: Boolean,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'categoryModel' },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'storeModel' },
  tag: { type: mongoose.Schema.Types.ObjectId, ref: 'tagModel' },
  inputAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'accountModel' },
  outputAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'accountModel' },
});

const transactionModel = mongoose.model('transaction', transactionSchema);

export default transactionModel;
