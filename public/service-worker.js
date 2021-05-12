const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/assets/css/bootstrap/bootstrap.min.css',
  '/assets/css/bootstrap/bootstrap.min.css.map',
  '/assets/css/style.css',
  '/assets/css/XRstyle.css',

  '/assets/js/bootstrap/bootstrap.bundle.min.js',
  '/assets/js/bootstrap/bootstrap.bundle.min.js.map',
  '/assets/js/jquery/jquery-3.4.1.js',

  '/assets/js/app.js',
  '/assets/js/guide.js',
  '/assets/js/home.js',
  '/assets/js/icons.js',
  '/assets/js/tour_webxr.js',

  '/assets/media/buttons/fullscreen-button.png',
  '/assets/media/buttons/options-button.png',

  '/assets/media/icons/icon-64x64.png',
  '/assets/media/icons/icon-128x128.png',
  '/assets/media/icons/icon-256x256.png',
  '/assets/media/icons/icon-512x512.png',

  '/assets/media/images/field.jpg',
  '/assets/media/images/landing.jpg',

  '/assets/sockets/socketGuide.js',
  '/assets/sockets/socketPeer.js',

  '/assets/webxr/render/core/material.js',
  '/assets/webxr/render/core/node.js',
  '/assets/webxr/render/core/primitive.js',
  '/assets/webxr/render/core/program.js',
  '/assets/webxr/render/core/renderer.js',
  '/assets/webxr/render/core/texture.js',

  '/assets/webxr/render/geometry/primitive-stream.js',
  '/assets/webxr/render/loaders/gltf2.js',
  '/assets/webxr/render/materials/pbr.js',
  '/assets/webxr/render/math/gl-matrix.js',
  '/assets/webxr/render/math/ray.js',
  '/assets/webxr/render/nodes/button.js',
  '/assets/webxr/render/nodes/gltf2.js',
  '/assets/webxr/render/nodes/input-renderer.js',
  '/assets/webxr/render/nodes/skybox.js',

  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/common.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/mat2.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/mat2d.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/mat3.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/mat4.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/quat.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/quat2.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/vec2.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/vec3.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix/vec4.js',
  '/assets/webxr/third-party/gl-matrix/src/gl-matrix.js',
  '/assets/webxr/third-party/webxr-polyfill/build/webxr-polyfill.module.js',
  '/assets/webxr/third-party/dat.gui.min.js',

  '/assets/webxr/util/inline-viewer-helper.js',
  '/assets/webxr/util/query-args.js',
  '/assets/webxr/util/webxr-button.js',

  '/assets/webxr/webxr.js',
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});