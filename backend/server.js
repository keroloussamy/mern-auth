require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const workoutsRouter = require('./routes/workouts');
const userRoutes = require('./routes/users');

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
app.use('/api/users', userRoutes)

// General error handling
// app.use((err, req, res, next) => {
//   res.status(500).json({ err });
// });

// 404
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  // if (req.accepts('html')) {
  //   res.render('404', { url: req.url });
  //   return;
  // }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  // res.type('txt').send('Not found');
});

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
