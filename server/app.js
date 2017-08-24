const express = require('express');
const app = express();
const bookshelf = require('./Bookshelf');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwks = require('jwks-rsa');
// const cookieParser = require('cookie-parser');
const GameTypeRoutes = require('./routes/GameTypes');
const SquaresRoutes = require('./routes/Squares');
const UsersRoutes = require('./routes/Users');
const BoardRoutes = require('./routes/Board');
const BoardSquareRoutes = require('./routes/BoardSquare');
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

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/gameTypes', jwtCheck, GameTypeRoutes);
app.use('/squares', jwtCheck, SquaresRoutes);
app.use('/users', jwtCheck, UsersRoutes);
app.use('/boards', jwtCheck, BoardRoutes);
app.use('/boardsquares', jwtCheck, BoardSquareRoutes);


module.exports = app;
// app.listen(8080, () => {
// 	console.log('Server Started on http://localhost:8080');
// 	console.log('Press CTRL + C to stop server');
// });