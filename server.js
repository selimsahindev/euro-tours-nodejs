const mongoose = require('mongoose');
const dotenv = require('dotenv');

// This should be at the top of the code.
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

setTimeout(() => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((con) => console.log('DB connection successful!'))
    .catch((err) => console.log(err));
}, 15000);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Server is running on port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
