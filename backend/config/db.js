const mongoose = require('mongoose');

// const { DB_STRING } = process.env;
// const { DB_NAME } = process.env;
// mongoose.Promise = global.Promise;

module.exports = async () => {
  try {
    await mongoose
      .connect(process.env.DB_STRING)
      .then(() => console.log('DB Connection Successfull'));
  } catch (error) {
    console.log(error.message);
  }
};
