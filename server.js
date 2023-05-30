import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 3000;

// Connect Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected Database Successfully !');
  })
  .catch((error) => {
    console.log('Failed to connect Database', error);
  });

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
