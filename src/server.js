const express = require('express');
const app = express();
const bookshelf = require('./bookshelf');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const GameTypeRoutes = require('./routes/GameTypes');
const SquaresRoutes = require('./routes/Squares');
const UsersRoutes = require('./routes/Users');
const BoardRoutes = require('./routes/Board');
const BoardSquareRoutes = require('./routes/BoardSquare');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  next();
});

app.use(express.static('public'))
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/gameTypes', GameTypeRoutes);
app.use('/squares', SquaresRoutes);
app.use('/users', UsersRoutes);
app.use('/boards', BoardRoutes);
app.use('/boardsquares', BoardSquareRoutes);



app.listen(8080, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});