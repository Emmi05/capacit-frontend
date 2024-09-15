import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../models/payment/payment'; // modelo
import { PaymentsService } from '../../../servicios/payment/payments.service'; // servicio
import { Router } from '@angular/router'; // router para navegación

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html', // nuestra vista
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = []; // Array para almacenar los pagos

  // Agregar el router al constructor
  constructor(private PaymentsService: PaymentsService, private router: Router) { }

  // ngOnit se ejecuta una vez cuando el componente se ha inicializado
  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    // Traer el método del servicio que obtiene todos los payments
    this.PaymentsService.getPayments().subscribe(
      (data: Payment[]) => {
        this.payments = data; // Si es correctamente muestra el array
      },
      (error) => {
        console.error('Error loading payments:', error); // Muestra mensaje de error
      }
    );
  }

  // Método para ver detalles del pago
  verDetallesPayment(id: number) {
    this.router.navigate(['detalle-payment', id]); // Navegar a la ruta de detalles con el ID del pago
  }
}
