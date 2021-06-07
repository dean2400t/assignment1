# assignment1

Created a simple API, which receives a GET request containing a body, with "url" field, in JSON format.</br>
Using Puppeteer to take a screenshot of the page from the URL, and then with ffmpeg and fluent-ffmpeg creating a 10 second video of the screenshot.</br>
The api sends JSON as response, containing the URL address to the video file in the "file" field.</br>

 
 
## How To Run:
  * Install [Node.js](https://nodejs.org/)
  * Clone repository 
  ``` 
   git clone https://github.com/dean2400t/assignment1.git 
   ```
  * Navigate to repository folder and enter "npm i" in command line
  * Enter "npm start" in command line

## Work Flow:
  1. validateReqInput: Checking only "url" field was sent, and that the address is a valid URL.
  2. takeScreenShot: Takes screenshot using Puppeteer.
  3. createVideo: Creating a ten second video of screenshot using @ffmpeg-installer/ffmpeg and fluent-ffmpeg.
  
 ## Decisions:
  * Puppeteer: Supports both SSR and none SSR pages.
  * @ffmpeg-installer/ffmpeg: installs ffmpeg required platform binaries in the node_modules which gives it out of the box support for multiple environments.
  * fluent-ffmpeg: abstracts the complex command line of ffmpeg and improves code readability.
