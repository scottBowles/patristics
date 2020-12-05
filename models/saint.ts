import mongoose, { Schema } from 'mongoose';

interface ISaint {
  name: string;
  birthYear: number;
  deathYear: number;
}

const Saint = mongoose.model(
  'Saint',
  new Schema({
    name: String,
    birthYear: Number,
    deathYear: Number,
  })
);

export { Saint, ISaint };
