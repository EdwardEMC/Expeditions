// Retrieve user data from local storage
const guide = JSON.parse(localStorage.getItem("Guide")); //name of the current timer
let socket = io();
let connected = false;

// On log in connect socket (only once)
if(!connected) {
    socket = io.connect({
        query: {
            room: guide.room, 
            peer: guide.peer
        }
    });

    connected = true;
}

socket.on("update-user-list", data => {
    console.log("ONLINE USERS");
    console.log(data);
});

socket.on('user-disconnected', data => {
    console.log(data);
});

socket.on('image', image => {
    //add the image to the vr_source
    document.getElementById("vr_source").src = `data:image/jpg;base64,${image}`; 
});