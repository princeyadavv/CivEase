const express = require('express')
const multer = require('multer')
const cors = require('cors');
app.use(cors());
const path = require('path');
const app = express()
const PORT = process.env.PORT || 5000

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
  
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
      cb(null, true);
    },
  });


app.get('/',(req,res)=>{
    res.send('hii')
})
app.post('/upload', upload.single('img'), (req, res) => {

    const {username,email,address,mobile} = req.body
    console.log(username,email,address,mobile)
    if (!req.img) {
        return res.status(400).send('No file uploaded');
    }

  return  res.json({
        message: 'File uploaded successfully!',
        file: req.file
    });
});

app.listen(PORT,()=>console.log(`server started at http://localhost:${PORT}`))
