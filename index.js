const express = require('express');

const app = express();
const puppeteer = require('puppeteer');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

app.get('/', async function (req, res) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://reddit.com/');
    await page.screenshot({ path: 'screenShot.png' });
    await browser.close();
    
    try {
      const command = ffmpeg();
      command
      .input('screenShot.png')
      .loop(10)
      .on('end',  function (err) {
        if (!err)
          res.status(200).send("Successfull");
        else
          res.status(500).send('Fail');
      })
      .output('out.mp4')
      .noAudio()
      .run();
      const x=3;
    } catch (e) {
      console.log(e);
    }
    
  })

const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;