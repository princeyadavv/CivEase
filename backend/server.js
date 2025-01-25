const express = require('express')
const multer = require('multer')
const cors = require('cors');
const path = require('path');
const app = express()
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 5000


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the filename
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('hii')
})
app.post('/upload',   (req, res) => {
    const { firstname, lastname, email, password } = req.body
    console.log(lastname, firstname, email, password)
    console.log(req.file)


    return res.json({
        message: 'File uploaded successfully!',
        
    });
});

app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`))
