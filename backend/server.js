require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const workoutsRouter = require('./routes/workouts');

// middleware
app.use(express.json()); // To parse the incoming requests with JSON payloads, and is based on body-parser.
app.use((req, res, next) => {
  console.log(req.path, req.method); // Logger middleware
  next(); 
  // To go to next the function in your file from top to bottom.
  // When we use res.send (or any other func) it will end the execution and return response to the user.
});


// routes
app.use('/api/workouts', workoutsRouter);

// connect to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("DB connected and server is listening on port", process.env.PORT);
    })
  })
  .catch(err => console.log(err));
