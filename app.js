const express = require('express');
const path = require('path');
const multer = require('multer');
const shuffleImage = require('./shuffleImage');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/shuffle', upload.single('image'), (req, res) => {
  const { rows, cols } = req.body;
  const inputImagePath = path.join(__dirname, 'uploads', req.file.filename);
  //const shuffledImagePath = path.join(__dirname, 'public', 'shuffledImage.png');
  const shuffledImagePath = path.join(__dirname, 'shuffledImages', req.file.filename);

  shuffleImage(inputImagePath, shuffledImagePath, rows, cols);

  res.sendFile(shuffledImagePath);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
