import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDTO } from '../../models/payment/payment'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Interfaz para manejar la paginación
export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
@Injectable({
  providedIn: 'root' // Está en todo el proyecto
})
export class PaymentsService {
  private apiUrl = 'http://localhost:8080/api/v1/payments';  // API DE BACKEND

  constructor(private http: HttpClient) { }

  // Método para obtener todos los pagos
  getPayments(): Observable<PaymentDTO[]> { 
    return this.http.get<PaymentDTO[]>(this.apiUrl);
  }

 // Método para obtener pagos con paginación // Dentro de tu servicio
getPaginatedPayments(page: number = 0, size: number = 5): Observable<Page<PaymentDTO>> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
  return this.http.get<Page<PaymentDTO>>(`${this.apiUrl}/paginated`, { params }).pipe(
    catchError(error => {
      console.error('Error fetching paginated payments', error);
      return throwError(error);
    })
  );
}

 // Método para crear un nuevo pago
 createPayment(payment: PaymentDTO): Observable<PaymentDTO> {
  return this.http.post<PaymentDTO>(this.apiUrl, payment);
}

  // Método para obtener un pago por ID
  getPaymentById(id: number): Observable<PaymentDTO> { // Cambiar a PaymentDTO
    return this.http.get<PaymentDTO>(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar un pago
  updatePayment(id: number, payment: PaymentDTO): Observable<PaymentDTO> { // Cambiar a PaymentDTO
    return this.http.put<PaymentDTO>(`${this.apiUrl}/${id}`, payment);
  }

  // Método para eliminar un pago por ID
  deletePaymentById(id: number): Observable<PaymentDTO[]> { // Cambiar a PaymentDTO[]
    return this.http.delete<PaymentDTO[]>(`${this.apiUrl}/${id}`);
  }
}
