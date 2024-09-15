import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteDTO } from '../../models/payment/payment'; // Modelo de pago


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseURL = "http://localhost:8080/api/v1/clientes";

  constructor(private httpClient: HttpClient) {  }
  // Método para obtener todos los clientes
  getClientes(): Observable<ClienteDTO[]> {
    return this.httpClient.get<ClienteDTO[]>(this.baseURL);
  }

  listarClientes():Observable<ClienteDTO[]> {
    return this.httpClient.get<ClienteDTO[]>(`${this.baseURL}`);
  }

  getClienteById(id:Number):Observable<ClienteDTO> {
    return this.httpClient.get<ClienteDTO>(`${this.baseURL}/buscarPorId/${id}`);
  }  

}
