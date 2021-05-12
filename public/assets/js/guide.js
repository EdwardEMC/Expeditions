import {changeSkybox} from '/assets/js/tour_webxr.js';

const exit = document.getElementById("exit");
const upload = document.getElementById("upload");
const share = document.getElementById("share_code");
const saved_guide = JSON.parse(localStorage.getItem("Guide")); //saved guide which doubles as the share code

//exit back to the landing page and emit to connected sockets
exit.addEventListener("click", () => {
  socket.emit("exit");
  location.href = "/";
});

upload.addEventListener('change', e => {
  openFile(e);
});

//upload the chosen file to the image source
function openFile(e) {
  let input = e.target.files;
  let file = input[0];

  let reader = new FileReader();
  reader.onload = (function(f) {
    return function(e) {
        console.log(this.result);
        let dataURL = reader.result;
        let bytes = this.result.replace(/.*base64,/, '');
        console.log(bytes, "BYTES");
        sendFile(bytes);
        //function from tour_webxr
        changeSkybox(dataURL);
    };
  })(file);
  if(file instanceof Blob) {
    reader.readAsDataURL(file);
  }
};

//send the file to the connected sockets
function sendFile(bytes) {
  socket.emit('image', bytes);
}

//load any previously saved tasks
window.onload = () => {
  $("#current_guide").html(saved_guide.peer);
  share.innerHTML = saved_guide.room; //display the share code for other group members to join
};