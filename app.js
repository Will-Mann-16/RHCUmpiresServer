var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');

var availabilityRoutes = require('./routes/availability');
var clubRoutes = require('./routes/clubs');
var divisionsRoutes = require('./routes/divisions');
var fixturesRoutes = require('./routes/fixtures');
var leaguesRoutes = require('./routes/leagues');
var qualificationRoutes = require('./routes/qualifications');
var teamsRoutes = require('./routes/teams');
var umpireRoutes = require('./routes/umpires');
var venuesRoutes = require('./routes/venues');
var apiRoutes = express.Router();
apiRoutes.use('/availability', availabilityRoutes);
apiRoutes.use('/clubs', clubRoutes);
apiRoutes.use('/divisions', divisionsRoutes);
apiRoutes.use('/fixtures', fixturesRoutes);
apiRoutes.use('/leagues', leaguesRoutes);
apiRoutes.use('/qualifications', qualificationRoutes);
apiRoutes.use('/teams', teamsRoutes);
apiRoutes.use('/umpires', umpireRoutes);
apiRoutes.use('/venues', venuesRoutes);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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

// database connection
app.use(function(err, req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rhcumpires'
  });
  res.locals.connection.connect();
  next();
});

app.use('/api/v1', apiRoutes);

port = process.env.PORT || 3001;
app.listen(port);
