import { Component, OnInit } from '@angular/core';
import { FcmService } from './fcm.service';
import { AlertService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private fcmService: FcmService,
    private alertService: AlertService
  ) {}

  temp = 33;
  humedad = 43;
  aire = 124;
  fcmToken: string = ''; // Para almacenar el token FCM

  ngOnInit() {
    // Solicitar permisos para recibir notificaciones
    this.fcmService.requestPermission();

    // Recibir las notificaciones en primer plano
    this.fcmService.receiveMessage();

    // Obtener el token FCM al iniciar
    this.fcmService.getToken();

    this.fcmService.getTokenClient()

    // Iniciar la simulación de los valores
    this.startSimulation();
  }

  // Función que inicia la simulación de cambios en los valores
  startSimulation() {
    setInterval(() => {
      this.simulateEnvironment();
      this.checkAlerts();
    }, 2000);
  }

  // Función que simula los cambios en la temperatura, humedad y calidad del aire
  simulateEnvironment() {
    this.temp += (Math.random() - 0.5) * 10;
    this.humedad += (Math.random() - 0.5) * 4;
    this.aire += (Math.random() - 0.5) * 30;

    // Limitamos los valores
    this.temp = Math.max(0, Math.min(50, this.temp));
    this.humedad = Math.max(0, Math.min(100, this.humedad));
    this.aire = Math.max(0, Math.min(500, this.aire));
  }

  // Función que verifica los valores y manda alertas
  checkAlerts() {
    if (this.temp >= 40) {
      setTimeout(() => {
        this.sendAlert('¡Advertencia!','La temperatura está peligrosamente alta');
      }, 7000);
    }

    if (this.humedad <= 40) {
      setTimeout(() => {
        this.sendAlert('¡Advertencia!','La humedad está por debajo del nivel seguro.');
      }, 7000)
    }

    if (this.aire >= 150) {
      setTimeout(() => {
        this.sendAlert('¡Advertencia!','La calidad del aire es peligrosa.');
      }, 7000)
    }
  }

  // Función que envía la alerta con el token FCM
  sendAlert(tittle: string, body: string) {
    this.fcmToken = this.fcmService.getTokenClient()

    if (this.fcmToken) {
      this.alertService.sendAlert(this.fcmToken, tittle, body).subscribe(
        (response) => {
          console.log('Alerta enviada al servidor');
        },
        (error) => {
          console.error('Error al enviar la alerta');
        }
      );
    } else {
      console.log('No se ha obtenido el token FCM aún.');
    }
  }

}
