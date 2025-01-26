require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')


const {checkAuthentication}= require('./middlewares/auth')
const staticRouter = require('./routes/staticRouter');
const issueRouter = require('./routes/issue')



const app = express()
const PORT = process.env.PORT || 5000


app.use(cors());
app.use(express.json())
app.use(checkAuthentication)
app.use('/',staticRouter)
app.use('/issue',issueRouter)



mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
