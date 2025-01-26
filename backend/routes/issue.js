const express = require('express');
const multer = require('multer');
const path = require('path');
const { handleUpload ,handleSupport} = require('../controllers/issue');
const commentRouter = require('../routes/comment')
const router = express.Router();


router.use('/comment',commentRouter)

router.post('/support/:id',handleSupport)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

router.post('/add', upload.single('file'), handleUpload);
router.get('/',(req,res)=>{
    res.send('issue')
})

module.exports = router;
