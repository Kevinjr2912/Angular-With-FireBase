// src/app/fcm.service.ts
import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, vapid_key } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  private messaging;

  constructor() {
    // Inicializamos Firebase
    const app = initializeApp(firebaseConfig);
    this.messaging = getMessaging(app);
  }

  // Solicitamos los permisos para recibir notificaciones
  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
        this.getToken();
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  // Obtenemos el token FCM generado para dicho cliente
  getToken() {
    getToken(this.messaging, {
      vapidKey: vapid_key,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token FCM:', currentToken);
          // Send the token to your server and update the UI if necessary
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((error) => {
        console.error('Error getting FCM token:', error);
      });
  }

  // Recibir mensajes cuando la aplicación está en primer plano
  receiveMessage() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);

      if (payload.notification?.title && payload.notification?.body) {
        this.showNotification(
          payload.notification.title,
          payload.notification.body
        );
      } else {
        console.error(
          'Message Invalid'
        );
      }
    });
  }

  // Función para mostrar una notificación en el navegador
  private showNotification(title: string, body: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '',
      });
    }
  }
}
