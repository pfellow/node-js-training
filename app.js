const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const rootDir = require('./utils/path');
const errorsController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://pfellow:f5jsJ4YK8IYWdtbI@cluster0.nrdbgre.mongodb.net/shop';

const app = express();
const store = new MongoDBSession({
  uri: MONGODB_URI,
  collection: 'session'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use(
  session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session?.user?._id) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorsController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
