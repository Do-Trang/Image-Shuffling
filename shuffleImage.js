const fs = require('fs');
const Jimp = require('jimp');

async function shuffleImage(inputImagePath, shuffledImagePath, rows, cols) {
  try {
    const inputImage = await Jimp.read(inputImagePath);

    const pieceWidth = inputImage.getWidth() / cols;
    const pieceHeight = inputImage.getHeight() / rows;

    const pieces = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * pieceWidth;
        const y = row * pieceHeight;

        const piece = inputImage.clone().crop(x, y, pieceWidth, pieceHeight);
        pieces.push(piece);
      }
    }

    pieces.sort(() => Math.random() - 0.5);

    const shuffledImage = new Jimp(inputImage.getWidth(), inputImage.getHeight());

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const x = col * pieceWidth;
        const y = row * pieceHeight;

        shuffledImage.blit(pieces[index], x, y);
      }
    }

    await shuffledImage.writeAsync(shuffledImagePath);
  } catch (error) {
    console.error(error);
  }
}

module.exports = shuffleImage;
