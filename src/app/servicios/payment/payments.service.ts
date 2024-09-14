import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../models/payment/payment';

@Injectable({
  providedIn: 'root' //estar en todo el proyecto
})
export class PaymentsService {
  private apiUrl = 'http://localhost:8080/api/v1/payments';  // API DE BACKEND

  //http para que haga peticiones de get, post, etc...
  constructor(private http: HttpClient) { }

  // Método para obtener todos los pagos, OBSERVABLE es asincrono 
  getPayments(): Observable<Payment[]> { //hace una petición get a mi API 
    return this.http.get<Payment[]>(this.apiUrl);
  }
}
