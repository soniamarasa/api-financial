import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  name: String,
  color: String,
});

const tagModel = mongoose.model('tag', tagSchema);

export default tagModel;
