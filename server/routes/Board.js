var express = require('express');
const Board = require('../models/Board');
const BoardSquare = require('../models/BoardSquare');
const Square = require('../models/Square');
var router = express.Router();

router.get('/', (req, res) => {
    console.log('req.headers.email', req.headers.userID)
    // if (!req.header.email)
    Board
        .query({where: {userID: req.headers.userID}})
        .fetchAll({
            withRelated: ['gameType', 'boardSquares']
        })
        .then(boards => {
            console.log('hai')
            console.log(JSON.stringify(boards));
            res.json(boards);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
});

router.get('/:boardID', (req, res) => {
    Board
        .query({where: {id: req.params.boardID}})
        .fetch({
            withRelated: [{
                'boardSquares': function(qb) {
                    qb.orderBy("order");
                }
            },
            'boardSquares.square', 'gameType']
        })
        .then(board => {
            // console.log(JSON.stringify(board));
            res.json(board);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
});

router.post('/:gameTypeID', (req, res) => {
    const newBoard = new Board ({
        userID: req.headers.userID,
        gameTypeID: req.params.gameTypeID
    });
    newBoard.save()
    .then((newBoard) => {
        Square.query({where: {gameTypeID: req.params.gameTypeID}})
            .fetchAll()
            .then((squares) => {
                if (squares.models.length < 25) {
                    res.json({status: 'not enough'});
                }
                let boardSquares = [];
                for (var i = 0; i < 25; i++) {
                    let randIndex = Math.floor(Math.random() * squares.models.length);
                    boardSquares.push(new BoardSquare ({
                        boardID: newBoard.id,
                        squareID: squares.models[randIndex].id,
                        order: i
                    }))
                    squares.models.splice(randIndex, 1)
                }
                let savePromises = boardSquares.map((bs) => {
                    return bs.save();
                })
                Promise.all(savePromises)
                .then((saveResults) => {
                    res.json({id: newBoard.id})
                });
            })
    })
})
            
router.put('/boardID', (req, res) => {
    console.log(req.params);
    Board
        .query({where: {id: req.params.boardID}})
        .fetch()
        .then((board) => {
            board.set(req.body)
                .save()
                .then((result) => {
                    res.json(board);
                })
            
        })
        
})
            
router.delete('/:boardID', (req, res) => {
    Board
        .query({where: {id: req.params.boardID}})
        .fetch()
        .then((board) => {
            board.destroy()
                .then((result) => {
                    res.json({success: true});
                })
            
        })
        
})

module.exports = router;