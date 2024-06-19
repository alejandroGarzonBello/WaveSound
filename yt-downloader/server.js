const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/subidas', express.static(path.join(__dirname, 'subidas')));

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

  app.post('/upload/:id', (req, res) => {
    const id = req.params.id;
    const file = req.files.archivo;

    const userPath = path.join(__dirname, `subidas/${id}`);
    fs.mkdirSync(userPath, { recursive: true });

    const filePath = path.join(userPath, file.name);

    fs.writeFile(filePath, file.data, (err) => {
      if (err) {
        console.error('Error al guardar el archivo:', err);
        res.status(500).send('Error al guardar el archivo');
      } else {
        res.send('Archivo ha sido subido y guardado.');
      }
    });
  });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/**
 * Mobile
 */
app.post('/downloadAudioLocal', async (req, res) => {
    const { url, audioName } = req.body;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).send('URL inválida');
    }

    try {
        const info = await ytdl.getInfo(url);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        if (audioFormats.length === 0) {
            return res.status(400).send('No se encontró audio');
        }

        const userPath = path.join(__dirname, 'descargas/audio/mobile');
        fs.mkdirSync(userPath, { recursive: true });

        const filePath = path.join(userPath, `${audioName}.m4a`);
        const audioStream = ytdl(url, { quality: 'highestaudio', filter: 'audioonly' });

        const writeStream = fs.createWriteStream(filePath);

        audioStream.pipe(writeStream);

        writeStream.on('finish', () => {
            res.json({ path: `http://192.168.32.69:3000/downloadAudioLocal?filePath=${filePath}` });
        });

        writeStream.on('error', (error) => {
            console.error('Error al escribir el archivo:', error);
            res.status(500).send('Error al escribir el archivo');
        });

        audioStream.on('error', (error) => {
            console.error('Error al descargar el audio:', error);
            res.status(500).send('Error al descargar el audio');
        });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

app.get('/downloadAudioLocal', (req, res) => {
    const filePath = req.query.filePath;
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error al enviar el archivo:', err);
            res.status(500).send('Error al enviar el archivo');
        }
    });
});
