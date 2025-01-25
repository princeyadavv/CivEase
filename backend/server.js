const express = require('express')
const multer = require('multer')
const cors = require('cors');
const path = require('path');
const app = express()
app.use(cors());
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

app.get('/',(req,res)=>{
    res.send('hii')
})
app.post('/upload', upload.single('file'), (req, res) => {
    const {name,email,username} = req.body
    console.log(name,email,username)
console.log(req.file)
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

  return  res.json({
        message: 'File uploaded successfully!',
        file: req.file
    });
});

app.listen(PORT,()=>console.log(`server started at http://localhost:${PORT}`))
