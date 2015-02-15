var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// load routes for repos, events, pulls, and issues
app.use('/', routes);
app.use('/users', users);

// dburl to a mongodb server hosted in the cloud
var dburl = 'mongodb://github:1234@ds041871.mongolab.com:41871/github';

// get db
var db = require('monk')(dburl);

// set the database
app.db = db;

require('./mongo/repoList.js')(app)
require('./mongo/repoView.js')(app)
require('./mongo/eventList.js')(app)
require('./mongo/eventView.js')(app)

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function() {
    var host = server.address().address
    var port = server.address().port
    console.log('App listening at http://%s:%s', host, port);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
