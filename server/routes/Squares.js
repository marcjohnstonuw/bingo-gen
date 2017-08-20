var express = require('express');
const Square = require('../models/Square')
var router = express.Router();

router.get('/:gameTypeID', (req, res) => {
    console.log(JSON.stringify(req.params))
    Square
        .query({where: {gameTypeID: req.params.gameTypeID}})
        .fetch()
        .then(squares => {
            console.log('hai')
            console.log(JSON.stringify(squares));
            res.json(squares);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
});

router.post('/:gameTypeID', (req, res) => {
    console.log(JSON.stringify(req.body))
    const squareData = Object.assign({gameTypeID: req.params.gameTypeID}, req.body)
    const newSquare = new Square(squareData);
    console.log('after');
    newSquare.save()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json(err)
        });
})
            
router.put('/:squareID', (req, res) => {
    console.log(req.params);
    Square
        .query({where: {id: req.params.squareID}})
        .fetch()
        .then((square) => {
            square.set(req.body)
                .save()
                .then((result) => {
                    res.json(square);
                })
            
        })
        
})
            
router.delete('/:squareID', (req, res) => {
    Square
        .query({where: {id: req.params.squareID}})
        .fetch()
        .then((square) => {
            square.destroy()
                .then((result) => {
                    res.json({success: true});
                })
            
        })
        
})

module.exports = router;