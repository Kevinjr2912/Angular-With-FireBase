importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBb8DI57SJPs2BVEW8t0OhHSjqnmdXDZJU",
  authDomain: "project-with-angular-88bd0.firebaseapp.com",
  projectId: "project-with-angular-88bd0",
  storageBucket: "project-with-angular-88bd0.firebasestorage.app",
  messagingSenderId: "450717180438",
  appId: "1:450717180438:web:3a2fe8e0098ad272a40b37",
  measurementId: "G-TQYF55TXE7"
});

const messaging = firebase.messaging();

// Manejamos notificaciones en segundo plano (esto se usa aunque solo necesitemos primer plano)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'Notificación';
  const notificationOptions = {
    body: payload.notification?.body || 'Mensaje sin cuerpo',
    icon: ''
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
