import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  userId: String,
  name: String,
  openingBalance: Number,
  currentBalance: Number,
  forecastBalance: Number,
  color: String,
  type: Object,
});

const accountModel = mongoose.model('account', accountSchema);

export default accountModel;
