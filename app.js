const express = require('express');
var path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded(
  {
    extended: true
  }
));
app.use(express.static(path.join(__dirname, 'public')));

const validateReqInput=require('./middleware/validateReqInput');
const takeScreenShot=require('./middleware/takeScreenShot');
const createVideo=require('./middleware/createVideo');
app.get('/', [validateReqInput, takeScreenShot, createVideo], function (req, res) {
    return res.status(200).send({file: req.videoFilePath})
  })

const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;