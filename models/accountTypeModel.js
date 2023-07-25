import mongoose from 'mongoose';

const accountTypeSchema = mongoose.Schema({
  name: String,
  icon: String,
});

const accountTypeModel = mongoose.model('accountType', accountTypeSchema);

export default accountTypeModel;
