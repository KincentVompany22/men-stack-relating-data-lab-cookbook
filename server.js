const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const foodsController = require("./controllers/food.js") // Importing the foods controller in server.js
const usersController = require("./controllers/users.js") // Importing the users controller in server.js

// Importing Custom Middleware
const isSignedIn = require("./middleware/is-signed-in.js")
const passUserToView = require("./middleware/pass-user-to-view.js")

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});


// For this application, users must be signed in to view any of the routes associated with their pantry.
// Therefore, isSignedIn should come above the foods controller, but not before auth.
app.use(passUserToView)
app.use('/auth', authController);
app.use("/community", usersController) // This is above isSignedIn and the foodsController so that anyone can access / community routes even when not signed in
app.use(isSignedIn)
app.use("/users/:userId/foods", foodsController) // Using middleware to direct incoming requests to /users/:userId/foods to the foods controller.



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
