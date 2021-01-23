const router = require('express').Router()
const ownerRouter = require('./owner')
const playerRouter = require('./player')

router.use('/owner', ownerRouter)
router.use('/player', playerRouter)

module.exports = router