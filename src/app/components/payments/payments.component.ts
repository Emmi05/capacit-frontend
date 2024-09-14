import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../models/payment/payment'; // modelo
import { PaymentsService } from '../../servicios/payment/payments.service'; //servicio
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html', //servira como nuestra vista
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = []; // Array para almacenar los pagos
//va al payment service 
  constructor(private PaymentsService: PaymentsService) { }
//ngOnit se ejecuta una vez cuando el componente se ha inicializado
  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    //traigo al método de Service que trae a todos los payments
    this.PaymentsService.getPayments().subscribe(
      (data: Payment[]) => {
        this.payments = data; //si es correctamente muestra el array
      },
      (error) => {
        console.error('Error loading payments:', error); //muestra mensaje de error
      }
    );
  }



}
