import mongoose from 'mongoose';
import transactionModel from './transactionModel';

const ruleSchema = mongoose.Schema({
  userId: String,
  transaction: transactionModel,
  fixed: Boolean,
  repeat: Boolean,
  qtd: Number,
  period: Number,
});

const ruleModel = mongoose.model('rule', ruleSchema);

export default ruleModel;
