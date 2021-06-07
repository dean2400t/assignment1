
/*
  Middleware receives req.body.
  Checks that body contains "url" field and no other fields.
  Checks "url" is a valid URL.
*/
module.exports= (req, res, next)=>
{
  const {url, ...rest}=req.body;
  if (!url)
    return res.status(400).send('No url was sent');

  //Checking that there are no other fields in body
  if (Object.keys(rest).length>0)
    return res.status(400).send('Object must contain url field only');

  try {
    new URL(url);
  } catch (error) {
    return res.status(400).send(`${error.input} is not a valid url`);
  }
  next();
}