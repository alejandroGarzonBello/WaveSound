const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/downloadVideo', async (req, res) => {
    const url = req.body.url;
    const videoName = req.body.videoName;
    const userId = req.body.userId;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const info = await ytdl.getInfo(url);

        const userPath = `descargas/video/${userId}`;
        fs.mkdirSync(userPath, { recursive: true });

        const videoStream = ytdl(url, {
            quality: 'highest'
        });

        videoStream.pipe(fs.createWriteStream(`${userPath}/${videoName}.mp4`));

        videoStream.on('end', () => {
            res.send('Video is being downloaded...');
        });

    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).send('Error downloading video');
    }
});

app.post('/downloadAudio', async (req, res) => {
    const url = req.body.url;
    const audioName = req.body.audioName;
    const userId = req.body.userId;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const info = await ytdl.getInfo(url);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        if (audioFormats.length === 0) {
            return res.status(400).send('No audio found');
        }

        const userPath = `descargas/audio/${userId}`;
        fs.mkdirSync(userPath, { recursive: true });

        const audioStream = ytdl(url, {
            quality: 'highestaudio',
            filter: 'audioonly',
            format: 'm4a'
        });

        audioStream.pipe(fs.createWriteStream(`${userPath}/${audioName}.m4a`));

        audioStream.on('end', () => {
            res.send('Audio is being downloaded...');
        });

    } catch (error) {
        console.error('Error downloading audio:', error);
        res.status(500).send('Error downloading audio');
    }
});









app.post('/downloadAudioLocal', async (req, res) => {
    const url = req.body.url;
    const audioName = req.body.audioName;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const userPath = `descargas/audio`;
        fs.mkdirSync(userPath, { recursive: true });

        const audioStream = ytdl(url, {
            quality: 'highestaudio',
            filter: 'audioonly'
        });

        const filePath = path.join(__dirname, `${userPath}/${audioName}.mp3`);
        const writeStream = fs.createWriteStream(filePath);

        audioStream.pipe(writeStream);

        writeStream.on('finish', () => {
            res.send({ message: 'Audio is downloaded', path: `http://localhost:3000/downloadAudioLocal?filePath=${encodeURIComponent(filePath)}` });
        });

        audioStream.on('error', (error) => {
            console.error('Error downloading audio:', error);
            res.status(500).send('Error downloading audio');
        });

    } catch (error) {
        console.error('Error downloading audio:', error);
        res.status(500).send('Error downloading audio');
    }
});

app.get('/downloadAudioLocal', function(req, res) {
    const filePath = req.query.filePath;
    res.download(filePath); // Set disposition and send it.
});














app.get('/downloadVideo', function(req, res){
    const videoName = req.query.videoName;
    const userId = req.query.userId;
    const file = `${__dirname}/descargas/video/${userId}/${videoName}`;
    res.download(file); // Set disposition and send it.
});

app.get('/downloadAudio', function(req, res){
    const audioName = req.query.audioName;
    const userId = req.query.userId;
    const file = `${__dirname}/descargas/audio/${userId}/${audioName}`;
    res.download(file); // Set disposition and send it.
});


  app.get('/listVideos', function(req, res){
    const userId = req.query.userId;
    const directoryPath = path.join(__dirname, `descargas/video/${userId}`);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      } 
      res.send(files);
    });
  });
  
  app.get('/listAudios', function(req, res){
    const userId = req.query.userId;
    const directoryPath = path.join(__dirname, `descargas/audio/${userId}`);
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      } 
      res.send(files);
    });
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
