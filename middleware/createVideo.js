
//Using @ffmpeg-installer/ffmpeg so the project will have ffmpeg without needing to set up ffmpeg path on the system
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

//Using fluent-ffmpeg for easier work flow and readability
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


/*
    Middleware receives image file path in req.screenShotPath.
    Uses createTenSecVid function to create a 10 second video of the image.
    Inserts vido file "url" address to req.videoFilePath
*/
module.exports=async (req,res,next)=>{
    try {
        const videoOutputPath='public/out.mp4';
        await createTenSecVid(req.screenShotPath, videoOutputPath);
        
        const serverAddress=req.get('host');
        req.videoFilePath=serverAddress+'/'+videoOutputPath;

        next();
    } catch (error) {
        return res.status(500).send('Error');
    }
 }

/*
    Function receives two strings containing image input path and video output path.
    Makes a 10 second video of the image, and saves it to videoOutputPath.
    Returns either promise solved or rejected. 
*/
function createTenSecVid(imageInputPath, videoOutputPath){
    return new Promise((resolve,reject)=>{
        
        try {
            const command = ffmpeg();
            command
            .input(imageInputPath)
            .loop(10)
            .output(videoOutputPath)
            .noAudio()
            .on('end',  function (err) {
                if (!err)
                    resolve();
                else
                    reject(new Error(err))
                })
            .on('error', function(err) {
                reject(new Error(err))
                })
            .run();
        } catch (err) {
            reject(new Error(err))
        }
    })
 }