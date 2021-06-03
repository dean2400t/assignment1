const express = require('express');

const app = express();

app.get('/', function (req, res) {
    return res.status(200).send('Hello World!')
  })

const port=process.env.PORT || 1337;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;