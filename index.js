const express = require('express');

const app = express();
const puppeteer = require('puppeteer');

app.get('/', async function (req, res) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
    return res.status(200).send('Hello World!')
  })

const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;