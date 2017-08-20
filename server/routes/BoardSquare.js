var express = require('express');
const Board = require('../models/Board');
const BoardSquare = require('../models/BoardSquare');
const Square = require('../models/Square');
var router = express.Router();

router.get('/:boardID', (req, res) => {
    BoardSquare
        .query({where: {boardID: req.params.boardID}})
        .fetchAll()
        .then(boardSquares => {
            console.log(JSON.stringify(boardSquares));
            res.json(boardSquares);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
});

router.post('/:gameTypeID', (req, res) => {
    const newBoard = new Board ({
        userID: 5,
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
                        squareID: squares.models[randIndex].id
                    }))
                    squares.models.splice(randIndex, 1)
                }
                let savePromises = boardSquares.map((bs) => {
                    return bs.save();
                })
                Promise.all(savePromises)
                .then((saveResults) => {
                    res.json(saveResults)
                });
            })
    })
})
            
router.put('/:boardSquareID', (req, res) => {
    BoardSquare
        .query({where: {id: req.params.boardSquareID}})
        .fetch()
        .then((square) => {
            console.log('setting :', req.body)
            square.set(req.body)
                .save()
                .then((result) => {
                    res.json(square);
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