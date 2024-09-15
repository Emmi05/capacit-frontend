import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el parámetro de la URL
import { Payment } from '../../../models/payment/payment'; // modelo
import { PaymentsService } from '../../../servicios/payment/payments.service'; //servicio

@Component({
  selector: 'app-detalle-payment',
  templateUrl: './detalle-payment.component.html',
  styleUrls: ['./detalle-payment.component.css']
})
export class DetallePaymentComponent implements OnInit {
 id:number;
 payment:Payment;

  constructor(
    private route: ActivatedRoute, // Inyectamos ActivatedRoute para obtener el ID de la URL
    private PaymentsService: PaymentsService // Inyectamos el servicio de Payments
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.id = this.route.snapshot.params['id'];
    this.payment = new Payment(); // Iniciar payment antes de cargar datos
    // Llamar al servicio para obtener los detalles del pago
    this.PaymentsService.getPaymentById(this.id).subscribe(
      (dato: Payment) => {
        this.payment = dato;
        swal(`Detalles del payment ${this.payment.id}`);
      },
      (error) => {
        console.error('Error al cargar detalles del pago:', error);
        swal('Error', 'No se pudieron cargar los detalles del pago', 'error');
      }
    );
  }
  
}
