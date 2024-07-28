const express = require('express');
const multer = require('multer');
const path = require('path');
const { parseLogFile, GetLogger } = require('./logger');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, 'textlog.txt'); // File name for the uploaded file
    }
});


app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded'); // Return error if no file is uploaded
    }
    parseLogFile(path.join(__dirname, 'uploads', 'textlog.txt')).then((logObjects) => {
        console.log('Parsed log objects:', logObjects);
        res.send('File uploaded and parsed successfully');
    }).catch((error) => {
        console.error('Error parsing log file:', error);
        res.status(500).send('Error parsing log file');
    });
});


app.get('/', GetLogger)
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
