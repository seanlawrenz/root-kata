import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import logger from 'morgan';
import mongoose from 'mongoose';

const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

const API_PORT = 3001;

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
