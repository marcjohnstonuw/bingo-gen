const express = require('express');
const app = express();
const bookshelf = require('./Bookshelf');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwks = require('jwks-rsa');
const GameTypeRoutes = require('./routes/GameTypes');
const SquaresRoutes = require('./routes/Squares');
const UsersRoutes = require('./routes/Users');
const BoardRoutes = require('./routes/Board');
const BoardSquareRoutes = require('./routes/BoardSquare');


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

app.use(jwtCheck);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  next();
});

app.use(express.static('public'))
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(checkJwt);

app.use('/gameTypes', checkJwt, GameTypeRoutes);
app.use('/squares', checkJwt, SquaresRoutes);
app.use('/users', checkJwt, UsersRoutes);
app.use('/boards', checkJwt, BoardRoutes);
app.use('/boardsquares', checkJwt, BoardSquareRoutes);



app.listen(8080, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});