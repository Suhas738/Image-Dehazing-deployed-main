const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const { spawnSync } = require('child_process');
const app = express();
const port = 5000;

// Configure Multer middleware to store uploaded files in the "uploads" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, /*Date.now() + '-' +*/ file.originalname)
  }
});

const upload = multer({ storage: storage });

// Serve index.html file on GET request
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function crearTemp(req) {
  setTimeout(() => {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File deleted: ' + req.file.path);
      }
    });
    fs.unlink(__dirname + '/' + 'images' + '/' + req.file.filename, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File deleted: ' + __dirname + '/' + 'images' + '/' + req.file.filename);
      }
    });
  }, 5000);
};

// Handle image file uploads on POST request using Multer middleware
app.post('/upload', upload.single('image'), (req, res) => {

  const childPython = spawnSync('python3', ['demo.py']);

  /*childPython.stdout.on('data',(data) => {
      console.log(`stdout: ${data}`);
  });

  childPython.stderr.on('data',(data) => {
      console.error(`stderr: ${data}`);
  });

  childPython.on('close',(code) => {
      console.log('child process exited');
      console.log(req.file.filename);
  });*/

  crearTemp(req);

  res.sendFile(__dirname + '/' + 'images' + '/' + req.file.filename);
  console.log(req.file.filename);


});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
