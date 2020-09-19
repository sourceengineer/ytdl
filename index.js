// https://www.npmjs.com/package/ytdl-core

const fs = require('fs');
const ytdl = require('ytdl-core');
const urlRegex = require('url-regex')



async function dl(url) {
    if(!url) return console.log("not Valid")
    info = await ytdl.getBasicInfo(url)
    title = info.videoDetails.title
    title.replace(/[<>:"/\|?*]/, "")
    console.log('Downloading ' + title)
    ytdl(url, { filter: format => format.container === 'mp4' })
        .pipe(fs.createWriteStream(`./downloads/${title}.mp4`));    
} 

process.argv.forEach(async (arg) => {
    if(urlRegex({exact : true}).test(arg)) await dl(arg);
});