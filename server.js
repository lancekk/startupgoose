const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/startgoosedb',
  {
    // all of these options are for mongoose < 6.0.0 only, and irrelevant with this project's version
  // useFindAndModify: false,
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => {
  console.log(`Apprunning on port ${PORT}!`);
})
