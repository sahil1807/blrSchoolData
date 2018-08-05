const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const mongoose = require('mongoose');
const promise = require('bluebird');
const config = require('./config');
const cors = require('cors');
const compression = require('compression');

const usersRouter = require('./routes/users');
const schoolDataRouter = require('./routes/schoolData');


mongoose.Promise = promise;

const db_settings = {
    reconnectTries : Number.MAX_VALUE,
    autoReconnect : true,
    keepAlive: 1,
    connectTimeoutMS: 30000
};

    mongoose.connect(config.devDb, {reconnectTries : Number.MAX_VALUE, autoReconnect : true});

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection-error'));
    db.once('open', function () {
        console.log('Connected to devDb');
    });

    db.on('disconnected', function() {
        console.log('disconnected');
        console.log('dbURI is: '+config.devDb);
        mongoose.connect(config.devDb,db_settings);
    });

const initData = require('./initData');
initData.init();

const app = express();
app.use(cors());
app.use(compression());
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/schoolData', schoolDataRouter);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error' + err);
});

module.exports = app;
