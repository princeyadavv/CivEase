const express = require('express')
const router = express.Router()
const {handleCommentPost} = require('../controllers/comment')

router.post('/',handleCommentPost)

module.exports = router