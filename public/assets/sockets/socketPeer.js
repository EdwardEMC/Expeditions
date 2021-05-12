import {changeSkybox} from '/assets/webxr/tour_webxr.js';

// Retrieve user data from local storage
const guide = JSON.parse(localStorage.getItem("Guide"));
let socket = io();
let connected = false;

// On log in connect socket (only once)
if(!connected) {
    socket = io.connect({
        query: {
            room: guide.room, 
            peer: guide.peer,
            isGuide: false
        }
    });

    connected = true;
}

socket.on("exit", () => {
    location.href = "/";
});

socket.on('image', image => {
    //add the image to the vr_source
    changeSkybox(`data:image/jpg;base64,${image}`);
});