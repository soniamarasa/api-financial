import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
});

const tagModel = mongoose.model('tag', tagSchema);

export default tagModel;
