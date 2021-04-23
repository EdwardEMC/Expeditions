// Retrieve user data from local storage
const users = document.getElementById("users");
const guide = JSON.parse(localStorage.getItem("Guide"));
let socket = io();
let connected = false;

// On log in connect socket (only once)
if(!connected) {
    socket = io.connect({
        query: {
            room: guide.room, 
            peer: guide.peer,
            isGuide: true
        }
    });

    connected = true;
}

socket.on("update-user-list", data => {
    updateUserList(data);
});

socket.on('user-disconnected', data => {
    updateUserList(data);
});

function updateUserList(data) {
    console.log(data);

    if(window.location.pathname != "/Guide") return;

    $("#num_connected").html(data.online.length - 1);

    while (users.firstChild) {
        users.removeChild(users.lastChild);
    }
    
    let p = document.createElement("h6");
    for(let x=0; x<data.online.length; x++) {
        if(data.online[x].isGuide == "false") {
            p = data.online[x].name;
            users.append(p);
        }
    }
}