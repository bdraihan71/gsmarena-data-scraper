const router = require('express').Router()



const {
    index,
    scraper
} = require('../controllers/scraperController')


router.get('/', index)
router.post('/scraper', scraper)

module.exports = router