import mongoose from 'mongoose';

const flagSchema = mongoose.Schema({
  name: String,
  icon: String,
});

const flagModel = mongoose.model('flag', flagSchema);

export default flagModel;
