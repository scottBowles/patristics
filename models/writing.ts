import mongoose, { Schema } from 'mongoose';

const writingSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  author: { type: Schema.Types.ObjectId, ref: 'Saint' },
});

export default mongoose.model('Writing', writingSchema);
