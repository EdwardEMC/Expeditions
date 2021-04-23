const upload = document.getElementById("upload");
const vrSource = document.getElementById("vr_source");
const share = document.getElementById("share_code");
const saved_timer = JSON.parse(localStorage.getItem("Guide")); //saved timer name which doubles as the share code

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
        vrSource.src = dataURL;
        let bytes = this.result.replace(/.*base64,/, '');
        console.log(bytes, "BYTES");
        sendFile(bytes);
    };
  })(file);
  reader.readAsDataURL(file);
};

//send the file to the connected sockets
function sendFile(bytes) {
  socket.emit('image', bytes);
}

//load any previously saved tasks
window.onload = () => {
  share.innerHTML = saved_timer.room; //display the share code for other group members to join
};