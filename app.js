var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var {PORT} = require('./config');

var authRoutes = require('./routes/auth');
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
apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/availability', passport.authenticate('jwt', {session: false}), availabilityRoutes);
apiRoutes.use('/clubs', passport.authenticate('jwt', {session: false}), clubRoutes);
apiRoutes.use('/divisions', passport.authenticate('jwt', {session: false}), divisionsRoutes);
apiRoutes.use('/fixtures', passport.authenticate('jwt', {session: false}), fixturesRoutes);
apiRoutes.use('/leagues', passport.authenticate('jwt', {session: false}),leaguesRoutes);
apiRoutes.use('/qualifications', passport.authenticate('jwt', {session: false}), qualificationRoutes);
apiRoutes.use('/teams', passport.authenticate('jwt', {session: false}), teamsRoutes);
apiRoutes.use('/umpires', passport.authenticate('jwt', {session: false}), umpireRoutes);
apiRoutes.use('/venues', passport.authenticate('jwt', {session: false}), venuesRoutes);

require('./passport');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', apiRoutes);

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

app.listen(PORT);
