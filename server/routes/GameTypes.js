var express = require('express');
const GameType = require('../models/GameType');
var router = express.Router();

router.get('/', (req, res) => {
    GameType.fetchAll()
        .then(gameTypes => {
            res.json(gameTypes);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});
router.get('/:gameTypeID', (req, res) => {
    GameType.query({where: {id: req.params.gameTypeID}})
        .fetch({
            withRelated: 'squares'
        })
        .then(gameType => {
            console.log(gameType)
            res.json(gameType);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
});

router.post('/', (req, res) => {
    const newGameType = new GameType(req.body);
    newGameType.save()
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.status(500).json(err)
    });
})
            
router.put('/:gameTypeID', (req, res) => {
    console.log(req.params.gameTypeID);
    GameType
        .query({where: {id: req.params.gameTypeID}})
        .fetch()
        .then((gameType) => {
            gameType.set(req.body)
                .save()
                .then((result) => {
                    res.json(gameType);
                })
            
        })
        
})
            
router.delete('/:gameTypeID', (req, res) => {
    console.log(req.params.gameTypeID);
    GameType
        .query({where: {id: req.params.gameTypeID}})
        .fetch()
        .then((gameType) => {
            gameType.destroy()
                .then((result) => {
                    res.json({success: true});
                })
            
        })
        
})

module.exports = router;