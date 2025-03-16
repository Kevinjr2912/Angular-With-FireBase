// src/app/alert.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http: HttpClient) {}

  serverUrl = 'http://localhost:8080/webHook';

  sendAlert(token: string, title: string, body: string): Observable<any> {

    const payload = {
      to: token,
      notification: {
        title: title,
        body: body,
      },
    };

    console.log("Esto se envia al server", payload)

    return this.http.post(this.serverUrl, payload);
  }
}
