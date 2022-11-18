console.log("Accessed!")

function connect() {
    const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
    const userName = JSON.parse(document.getElementById('json-username').textContent);
    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/'
        + roomName
        + '/'
    );

    chatSocket.onclose = function(e) {
        console.log('onclose')
    }

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log("OnMessage--")
        console.log(e.data);
        if (data.events == "ADD_TRACK") {
            console.log("OnMessage Event")
            console.log("Event triggered!")
            player.loadVideoById(data.videoID);
        } else if (data.events == "chat_message") {
            console.log("OnMessage in")
            console.log(data.videoID)
            if(data.message != "") {
                document.querySelector('#chat-messages').innerHTML += ('<b>' + data.username + '</b>: ' + data.message + '<br>');
            }
        } else if (data.events == "PLAY_VIDEO") {
            player.playVideo();
        } else if (data.events == "PAUSE_VIDEO") {
            player.pauseVideo();
        } else {
            alert('The message was empty!')
        }

        scrollToBottom();
    };

    document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = function(e) {
        if (e.keyCode === 13) {
            document.querySelector('#chat-message-submit').click();
        }
    };

    document.querySelector('#chat-message-submit').onclick = function(e) {
        e.preventDefault()

        const messageInputDom = document.querySelector('#chat-message-input');
        const message = messageInputDom.value;

        console.log({
            'message': message,
            'username': userName,
            'room': roomName,
            'videoID': '',
            'event': 'chat_message'
        })

        chatSocket.send(JSON.stringify({
            'videoID': '',
            'event': 'chat_message',
            'message': message,
            'username': userName,
            'room': roomName,
        }));

        messageInputDom.value = '';
        scrollToBottom();
        return false
    };

    // Add track
    document.querySelector('#add-track').onclick = function(e) {
        var event = 'ADD_TRACK';
        const addTackDom = document.querySelector('#url-field');
        const id = youtube_parser(addTackDom.value);
        console.log('add track clicked!')

        console.log({
            'event' : event, 
            'videoID': id,
            'username': userName,
            'room': roomName
        });

        chatSocket.send(
            JSON.stringify({
                event: event,
                videoID : id,
                username: userName,
                message: 'addtrack',
                room: roomName
            })
        );
    };

    //Playback controls
    document.querySelector('#play-button').onclick = function(e) {
        var event = 'PLAY_VIDEO';
        console.log('play button clicked!')

        console.log({
            'event' : event, 
            'videoID': '',
            'username': userName,
            'room': roomName
        });

        chatSocket.send(
            JSON.stringify({
                event: event,
                videoID : '',
                username: userName,
                message: '',
                room: roomName
            })
        );
    };

    document.querySelector('#pause-button').onclick = function(e) {
        var event = 'PAUSE_VIDEO';
        console.log('pause button clicked!')

        console.log({
            'event' : event, 
            'videoID': '',
            'username': userName,
            'room': roomName
        });

        chatSocket.send(
            JSON.stringify({
                event: event,
                videoID : '',
                username: userName,
                message: '',
                room: roomName
            })
        );
    };



    /**
    * A function for finding the messages element, and scroll to the bottom of it.
    */
    function scrollToBottom() {
        let objDiv = document.getElementById("chat-window");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    // Add this below the function to trigger the scroll on load.
    scrollToBottom();
}
