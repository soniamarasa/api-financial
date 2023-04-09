import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  userId: String,
  name: String,
  currentBalance: Number,
  expectedBalance: Number,
  icon: String,
  color: String,
  type: Number,
});

const accountModel = mongoose.model('account', accountSchema);

export default accountModel;
