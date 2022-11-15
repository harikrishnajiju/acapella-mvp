









function youtube_parser(url) {
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return "";
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "360",
        width: "640",
        videoId: "",
        playerVars: { controls: 0, disablekb: 1 },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
        },
    });
}


function onPlayerReady(event) {

    connect();
}

function onPlayerError(event) {
    console.log("Player error.");
    console.log(event);
}

function onPlayerStateChange(event) {
    console.log("State Changed.")
}

function pauseTrack() {
    // playBtn.classList.remove("pause");
    // playBtn.classList.add("play");
    player.pauseVideo();
}

function playTrack() {
    // playBtn.classList.remove("play");
    // playBtn.classList.add("pause");
    player.playVideo();
}