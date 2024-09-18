import { Component, OnInit } from '@angular/core';
import { PaymentDTO } from '../../../models/payment/payment'; // modelo
import { PaymentsService } from '../../../servicios/payment/payments.service'; // servicio
import { Router } from '@angular/router'; // router para navegación
import swal from 'sweetalert2'; // Asegúrate de importar Swal correctamente

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html', // nuestra vista
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: PaymentDTO[] = []; // Array para almacenar los pagos
  currentPage: number = 0; // Página actual
  pageSize: number = 5; // Tamaño de la página (número de elementos por página)
  totalPages: number = 0; // Número total de páginas

  constructor(private paymentsService: PaymentsService, private router: Router) { }

  ngOnInit(): void {
    this.loadPayments(this.currentPage, this.pageSize);
  }

  loadPayments(page: number, size: number): void {
    this.paymentsService.getPaginatedPayments(page, size).subscribe(response => {
      this.payments = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  // Funciones para la navegación de páginas
  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadPayments(page, this.pageSize);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadPayments(this.currentPage + 1, this.pageSize);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadPayments(this.currentPage - 1, this.pageSize);
    }
  }

  // Métodos para ver detalles, actualizar y eliminar pagos
  verDetallesPayment(id: number) {
    this.router.navigate(['detalle-payment', id]); 
  }

  actualizarpayment(id: number) {
    this.router.navigate(['actualizar-payment', id]);
  }

  eliminarPayment(id: number) {
    swal({
      title: "¿Estás seguro?",
      text: "Confirma si deseas eliminar el payment",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Sí, elimínalo",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.value) {  // Usa result.value para verificar la confirmación
        this.paymentsService.deletePaymentById(id).subscribe(() => {
          // Recargar la página actual después de eliminar
          this.loadPayments(this.currentPage, this.pageSize);
          swal(
            'Payment eliminado',
            'El payment ha sido eliminado con éxito',
            'success'
          );
        });
      }
    });
  }
}
