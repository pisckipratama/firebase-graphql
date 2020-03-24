const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const config = {
  apiKey: "AIzaSyAuvYHZh-SjCbqQ1FZ60qW0eDWbMRyAPNY",
  authDomain: "pisckify.firebaseapp.com",
  databaseURL: "https://pisckify.firebaseio.com",
  projectId: "pisckify",
  storageBucket: "pisckify.appspot.com",
  messagingSenderId: "269128389336"
}

firebase.initializeApp(config);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);

const userSchema = require('./graphql').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}))

module.exports = app;