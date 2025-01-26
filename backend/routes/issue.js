const express = require('express');
const multer = require('multer');
const path = require('path');
const { handleUpload, handleSupport } = require('../controllers/issue');
const commentRouter = require('./comment');
const router = express.Router();

router.use('/comment', commentRouter);

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure the uploads/ directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
    }
});

const upload = multer({ storage: storage });

// Routes
router.post('/support/:id', handleSupport);

router.post('/add', upload.single('file'), handleUpload);

router.get('/', (req, res) => {
    res.send('Issue route is working!');
});

module.exports = router;
