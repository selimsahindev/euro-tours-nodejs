require('dotenv').config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
