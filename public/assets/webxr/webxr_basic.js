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

// Fullscreen icon
let imgFull = app.createIcon("fullscreen-button.png", "fullscreen_toggle");
imgFull.onclick = function() { app.toggleFullScreen() };

// Options icon
let imgOptions = app.createIcon("options-button.png", "options_toggle");
imgOptions.onclick = function() { app.toggleOptions() };

document.body.append(imgFull, imgOptions);
document.getElementById('vr_button').appendChild(app.xrButton.domElement);

// Set up the source for skybox
app.scene.addNode(new SkyboxNode({
  url: 'assets/media/sample/rico_test.jpg'
}));

// Start the XR application.
app.run();