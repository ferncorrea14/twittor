//console.log('Hola Prueba');

// var CACHE_NAME = 'pwa-task-manager';
// var urlsToCache = [
//   '/',
//   '/completed'
// ];

// // Install a service worker
// self.addEventListener('install', event => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// // Cache and return requests
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

// // Update a service worker
// self.addEventListener('activate', event => {
//   var cacheWhitelist = ['pwa-task-manager'];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// imports
importScripts('serviceWorker-util.js');

const STATIC_CACHE    = 'static-v4';
const DYNAMIC_CACHE   = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    'Components/AreaDeTrabajo.js',
    'Components/ComoModal.js',
    'Components/DetalleForm.js',
    'Components/MyVrticallyCenteredModal.js',
    'Components/Navigation.js',
    'Components/TodoForm.js',
    'Images/Macroeconomia.jpg',
    'Images/Macroeconomia2.jpg',
    'Images/Macroeconomia3.jpg',
    'Images/Mundo.png',
    'Abajo.png',
    'App.css',
    'App.js',
    'App.test',
    'Arriba.png',
    'Igual.png',
    'index.css',
    'index.js',
    'logo.svg',
    'Seleccionados.json',
    'serviceWorker-util.js',
    'serviceWorker.js',
    'Todos.json'    
];

const APP_SHELL_INMUTABLE = [
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      'https://code.jquery.com/jquery-3.2.1.slim.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
];




  self.addEventListener('install', e => {

        console.log('install sw');

        const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
            cache.addAll( APP_SHELL ));

        const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
            cache.addAll( APP_SHELL_INMUTABLE ));



        e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

  });


  self.addEventListener('activate', e => {
        console.log('activate sw');

        const respuesta = caches.keys().then( keys => {

            keys.forEach( key => {

                if (  key !== STATIC_CACHE && key.includes('static') ) {
                    return caches.delete(key);
                }

                if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                    return caches.delete(key);
                }

            });

        });

        e.waitUntil( respuesta );

    });


    self.addEventListener( 'fetch', e => {

      console.log('fetch sw');

        const respuesta = caches.match( e.request ).then( res => {

            if ( res ) {
                return res;
            } else {

                return fetch( e.request ).then( newRes => {

                    return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

                });

            }

        });



        e.respondWith( respuesta );

    });



