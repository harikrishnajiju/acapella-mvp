console.log("Accessed!")

// let users = [];

function connect() {
    const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
    const userName = JSON.parse(document.getElementById('json-username').textContent);

    const hostName = JSON.parse(document.getElementById('json-hostname').textContent);
    let permFlag = 0;

    // add users
    // users.push(userName);
    // document.getElementById("userstest").innerHTML = users;

    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/'
        + roomName
        + '/'
    );

    // var usrs = document.getElementById("online-users")
    // var table = document.getElementById("online-users");
    // var row = table.insertRow(-1);
    // var cell = row.insertCell(0);
    // cell.innerHTML=userName;

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
        } else if (data.events == "RESTART_VIDEO") {
            player.seekTo(0);
        } else if (data.events == "CHANGE_PERMISSION") {
            console.log(permFlag);
            let res = changepermission(permFlag);
            permFlag = res;
        } else {
            console.log('The message was empty!')
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

    // Permission Controls
    document.querySelector('#permission-change').onclick = function(e) {
        if (userName == hostName) {
            var event = 'CHANGE_PERMISSION';
            console.log('change permission clicked!')

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
                    message: 'change permission',
                    room: roomName
                })
            );
        } else {
            window.alert('Only host can change room permissions!')
        }
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
        // window.alert(userName)
        // console.log(hostName)
        if(userName == hostName || permFlag == 1) {
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
            } else {
                window.alert('Only host can control playback!')
            }
    };

    document.querySelector('#pause-button').onclick = function(e) {
        if(userName == hostName || permFlag == 1) {
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
        } else {
            window.alert('Only host can control playback!')
        }
    };

    // restart
    document.querySelector('#restart-button').onclick = function(e) {
        if(userName == hostName || permFlag == 1) {
            var event = 'RESTART_VIDEO';
            console.log('restart button clicked!')

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
        } else {
            window.alert('Only host can control playback!')
        }
    };



    /**
    * A function for finding the messages element, and scroll to the bottom of it.
    */
    function scrollToBottom() {
        let objDiv = document.getElementById("chat-window");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    function changepermission(permFlag) {
        let textfield = document.getElementById("permission-control");
        if (permFlag == 0) {
            permFlag = 1;
            textfield.innerHTML = "Anyone";
        } else if (permFlag == 1) {
            permFlag = 0;
            textfield.innerHTML = "Host Only";
        }
        return permFlag;
    }

    // Add this below the function to trigger the scroll on load.
    scrollToBottom();
}
