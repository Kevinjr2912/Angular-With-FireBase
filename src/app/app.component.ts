// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { FcmService } from './fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fcmService: FcmService) {}

  ngOnInit() {
    // Solicitar permisos para recibir notificaciones
    this.fcmService.requestPermission();

    // Recibir las notificaciones en primer plano
    this.fcmService.receiveMessage();
  }
}
