//Information areas
const landing = document.getElementById("landing");
const codeInput = document.getElementById("code_input");
//Buttons
const createGuide = document.getElementById("create_guide");
const joinGuide = document.getElementById("join_guide");
const join = document.getElementById("join");
const back = document.getElementById("back");
//Inputs
const guideName = document.getElementById("guide_name");
const peerName = document.getElementById("peer_name");
const linkCode = document.getElementById("link_code");

//display an input area to fill out the "shared" code link
joinGuide.addEventListener("click", () => {
    landing.style.display = "none";
    codeInput.style.display = "block";
});

back.addEventListener("click", () => {
    landing.style.display = "block";
    codeInput.style.display = "none";
});

//join the room corresponding to the input
join.addEventListener("click", () => {
    //check input values are not empty
    if(linkCode.value == "" || peerName.value == "") return;
    //assign the link code as the room name
    saveUser(linkCode.value, peerName, "Expedition");
});

//creates a new guide link for explorers to join
createGuide.addEventListener("click", () => {
    //check input values are not empty
    if(guideName.value == "") return;
    //set a randomly assigned variable in localStorage that will be the timer name
    let unique_room = createUUID();
    saveUser(unique_room, guideName, "Guide");
});

// Create a random unique ID
function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// Save the room and name of a user to the local storage
function saveUser(room, name, page) {
    localStorage.setItem("Guide", JSON.stringify({
        room: room,
        peer: name.value 
    }));

    location.href = page; //change the location
}