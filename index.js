const express = require('express');
const app = express();
const bookshelf = require('./server/Bookshelf');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwks = require('jwks-rsa');
const jwt_decode = require('jwt-decode');
// const cookieParser = require('cookie-parser');
const GameTypeRoutes = require('./server/routes/GameTypes');
const SquaresRoutes = require('./server/routes/Squares');
const UsersRoutes = require('./server/routes/Users');
const BoardRoutes = require('./server/routes/Board');
const BoardSquareRoutes = require('./server/routes/BoardSquare');
const User = require('./server/models/User');
const path = require('path');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  next();
});

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://marcjohnstonuw.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://bingo-gen.api.com',
    issuer: "https://marcjohnstonuw.auth0.com/",
    algorithms: ['RS256']
});

app.use(function (req, res, next) {
  if (req.headers.id) {
    let decoded = jwt_decode(req.headers.id);
    User.query({where: {email: decoded.email}})
      .fetch()
      .then((user) => {
        req.headers.userID = user.id
        next();
      })
      .catch((err) => {
        next();
      })
  } else {
    next()
  }
})
//var decoded = jwt_decode(token);

// Serve static assets
console.log('__dirname', __dirname)
app.use(express.static(path.resolve(__dirname, 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/gameTypes', GameTypeRoutes);
app.use('/squares', jwtCheck, SquaresRoutes);
app.use('/users', jwtCheck, UsersRoutes);
app.use('/boards', jwtCheck, BoardRoutes);
app.use('/boardsquares', jwtCheck, BoardSquareRoutes);


module.exports = app;
// app.listen(8080, () => {
// 	console.log('Server Started on http://localhost:8080');
// 	console.log('Press CTRL + C to stop server');
// });

// // server/index.js
// 'use strict';

// const app = require('./server/app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});