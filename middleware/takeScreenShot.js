//Using puppeteer so screen shots will work for none SSR websites as well
const puppeteer = require('puppeteer');

/*
  Middleware receives "url" field in req.body.
  Takes screenshot of page in url.
  Insert screenshot path to req.screenShotPath
*/
module.exports=async (req,res,next)=>{
    const screenShotPath='screenShot.png'

    const {url}=req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      await page.goto(url);
    } catch (error) {
      return res.status(400).send('URL could no be reached')
    }
    await page.screenshot({ path: screenShotPath });
    await browser.close();
    req.screenShotPath=screenShotPath
    next();
  }