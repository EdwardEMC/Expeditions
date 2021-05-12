export class Icons {
  constructor() {

  }

  // add the fullscreen icon onto the screen
  createIcon(path, id) {
    let img = document.createElement("IMG");
    img.src = "/assets/media/buttons/" + path; //fullscreen.png
    img.alt = path;
    img.setAttribute("id", id); //fullscreen_toggle
    return img;
  }

  // toggle fullscreen mode
  toggleFullScreen() {
    let vr_button = $('#vr_button'); //for hiding the vr button in full screen mode
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      vr_button.toggle();
      if (document.documentElement.requestFullScreen) {  
        document.documentElement.requestFullScreen();  
      } else if (document.documentElement.mozRequestFullScreen) {  
        document.documentElement.mozRequestFullScreen();  
      } else if (document.documentElement.webkitRequestFullScreen) {  
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
      }  
    } else {  
      vr_button.toggle();
      if (document.cancelFullScreen) {  
        document.cancelFullScreen();  
      } else if (document.mozCancelFullScreen) {  
        document.mozCancelFullScreen();  
      } else if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
      }  
    }  
  }

  // hiding the player buttons
  toggleOptions() {
    let controls = $("#guide_controls");
    controls.toggle();
  }
}