// 2. This code loads the IFrame Player API code asynchronously.
console.log("player.js lol")
//  player.getVideoUrl()


function youtube_parser(url) {
let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
let match = url.match(regExp);
if (match && match[2].length == 11) {
    return match[2];
} else {
    return "";
}
}


function addTrack() {
const urlField = document.getElementById("url-field");
console.log(urlField)
const id = youtube_parser(urlField.value);
console.log(id)
player.loadVideoById(id);
}

function playVideo() {
player.playVideo();
}

function pauseVideo() {
player.pauseVideo();
}






var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
    'playsinline': 1
    },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
connect();
//    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
// if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
// }
}

function stopVideo() {
player.stopVideo();
}

 
 
 