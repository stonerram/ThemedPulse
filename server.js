// const mongoose = require("mongoose");
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors')

// const cors = require('cors');
// app.use(cors());

// dotenv.config();

// const signupRouter = require("./routes/signupRouter");

// const app = express();

// // Add CORS middleware
// const corsOptions = {
//   origin: 'http://localhost:5173', // Ensure this is the correct client URL
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(express.json()); // Add this line to parse JSON requests
// app.use("/", signupRouter);

// app.listen(process.env.PORT, () => {
//   console.log(`Listening to Port ${process.env.PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
dotenv.config();

const signupRouter = require('./routes/signupRouter');
const batchRouter = require('./routes/batchRouter');
const createTaskRouter = require('./routes/createTaskRouter');
const menuRouter = require('./routes/menuRouter');
const submitTaskRouter = require('./routes/submitTaskRouter')


const app = express();
const PORT = process.env.PORT;
const customCron = require('./cron');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected Successfully');
    customCron.sendMailAllUser();
  })
  .catch((err) => {
    console.log('Unable to Connect to MongoDB');
    console.error(err);
  });

app.use('/', signupRouter);
app.use('/', batchRouter);
app.use('/', createTaskRouter);
app.use('/', menuRouter);
app.use('/',submitTaskRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});