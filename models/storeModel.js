import mongoose from 'mongoose';

const storeSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
});

const storeModel = mongoose.model('store', storeSchema);

export default storeModel;
