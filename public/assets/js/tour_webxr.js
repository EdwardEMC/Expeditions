import {Icons} from '/assets/js/icons.js';
import {WebXR} from '/assets/webxr/webxr.js';
import {QueryArgs} from '/assets/webxr/util/query-args.js';
import {SkyboxNode} from '/assets/webxr/render/nodes/skybox.js';

// If requested, use the polyfill to provide support for mobile devices
// and devices which only support WebVR.
import WebXRPolyfill from '/assets/webxr/third-party/webxr-polyfill/build/webxr-polyfill.module.js';
if (QueryArgs.getBool('usePolyfill', true)) {
  let polyfill = new WebXRPolyfill();
}

// WebXR setup
let app = new WebXR({referenceSpace: 'local-floor'});

// Icon setup
let icon = new Icons();

// Fullscreen icon
let imgFull = icon.createIcon("fullscreen-button.png", "fullscreen_toggle");
imgFull.onclick = function() { icon.toggleFullScreen() };

// Options icon
let imgOptions = icon.createIcon("options-button.png", "options_toggle");
imgOptions.onclick = function() { icon.toggleOptions() };

// Attached the icons and vr button to the document
document.body.append(imgFull, imgOptions);
document.getElementById('vr_button').appendChild(app.xrButton.domElement);

// Set up the source for skybox
app.scene.addNode(new SkyboxNode({
  url: 'assets/media/sample/field.jpg'
}));

// Start the XR application.
app.run();

//Changing the skybox
export function changeSkybox(source) {
  let skies = [];
  let nodes = app.scene.children;

  //add a new skybox before deleteing the old one to save screen tear
  let staticSkybox = new SkyboxNode({
    url: source
  });

  app.scene.addNode(staticSkybox);

  //delete the oldest skybox
  nodes.forEach(node => {
    if(node.name === "Skybox") skies.push(node);
  });
  
  if(skies.length>1) app.scene.removeNode(skies[0]);
}