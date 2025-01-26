const express = require('express')
const router = express.Router()
const {showAllIssues,ShowParticularIssue}= require('../controllers/explore')
router.get('/',showAllIssues)
router.get('/issue/:id',ShowParticularIssue)



module.exports = router