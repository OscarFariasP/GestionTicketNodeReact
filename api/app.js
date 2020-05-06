var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersAuth = require('./routes/auth');
var createTicket = require('./routes/createTicket');
var fetchTickets = require('./routes/fetchTickets');
var deleteTickets = require('./routes/deleteTicket');
var getTicket = require('./routes/getTicket');
var editTicket = require('./routes/editTicket');
var checkToken = require ('./routes/middleware'); 
var setToken = require('./routes/setToken');
var logout = require('./routes/logout');
var setTicket = require('./routes/setTicket');
var getUserInfo = require('./routes/getUserInfo');
var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());



// Then pass them to cors:
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',usersAuth);
app.use('/createTicket',createTicket);
app.use('/fetchTickets',fetchTickets);
app.use('/deleteTicket',deleteTickets);
app.use('/getTicket',getTicket);
app.use('/editTicket',editTicket);
app.use('/logout',logout);
app.use('/setTicket',setTicket);
app.use('/getUserInfo',getUserInfo);
app.post('/checkToken', checkToken, function(req, res) {   
  res.sendStatus(200);
});
app.use('/setToken',setToken);



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
  res.render('error');
});

module.exports = app;
