const express = require('express')
const multer = require('multer')
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
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    }
  });
app.get('/',(req,res)=>{
    res.send('hii')
})
app.post('/add',upload.single('img'),(req,res)=>{

})

app.listen(PORT,()=>console.log(`server started at http://localhost:${PORT}`))
