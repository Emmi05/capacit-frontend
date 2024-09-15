import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; // Para obtener el parámetro de la URL
import { PaymentDTO } from '../../../models/payment/payment'; // Cambiar a DTO
import { PaymentsService } from '../../../servicios/payment/payments.service'; // Servicio

@Component({
  selector: 'app-detalle-payment',
  templateUrl: './detalle-payment.component.html',
  styleUrls: ['./detalle-payment.component.css']
})
export class DetallePaymentComponent implements OnInit {
  id: number;
  payment: PaymentDTO; // Cambiar a PaymentDTO

  constructor(
    private route: ActivatedRoute,
    private paymentsService: PaymentsService,
    private router: Router // Inyectar Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.id = this.route.snapshot.params['id'];
    this.payment = {} as PaymentDTO; // Inicializar payment como un objeto vacío de PaymentDTO
    // Llamar al servicio para obtener los detalles del pago
    this.paymentsService.getPaymentById(this.id).subscribe(
      (dato: PaymentDTO) => { // Cambiar el tipo de dato a PaymentDTO
        this.payment = dato;
        swal(`Detalles del pago ${this.payment.id} `);
      },
      (error) => {
        console.error('Error al cargar detalles del pago:', error);
        swal('Error', 'No se pudieron cargar los detalles del pago', 'error');
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/payments']); // Redirigir a la lista de pagos
  }
}
