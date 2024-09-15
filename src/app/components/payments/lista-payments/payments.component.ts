import { Component, OnInit } from '@angular/core';
import { PaymentDTO } from '../../../models/payment/payment'; // modelo
import { PaymentsService } from '../../../servicios/payment/payments.service'; // servicio
import { Router } from '@angular/router'; // router para navegación
import swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html', // nuestra vista
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: PaymentDTO[] = []; // Array para almacenar los pagos

  // Agregar el router al constructor
  constructor(private PaymentsService: PaymentsService, private router: Router) { }

  // ngOnit se ejecuta una vez cuando el componente se ha inicializado
  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    // Traer el método del servicio que obtiene todos los payments
    this.PaymentsService.getPayments().subscribe(
      (data: PaymentDTO[]) => {
        this.payments = data; // Si es correctamente muestra el array
      },
      (error) => {
        console.error('Error loading payments:', error); // Muestra mensaje de error
      }
    );
  }
//aqui ellos me llevan a la ruta
  
  verDetallesPayment(id: number) {
    this.router.navigate(['detalle-payment', id]); 
  }
  actualizarpayment(id:number) {
    this.router.navigate(['actualizar-payment',id]);
  }
  private obtenerPayment() {
    this.PaymentsService.getPayments().subscribe(dato => {
      this.payments = dato;
    });
  }
  eliminarPayment(id:number) {
    swal({
      title : "¿Estás seguro?",
      text : "Confirma si deseas eliminar el payment",
      type : "warning",
      showCancelButton : true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : "Si, eliminalo",
      cancelButtonText : "No, cancelar",
      confirmButtonClass : "btn btn-success",
      cancelButtonClass : "btn btn-danger",
      buttonsStyling : true
    }).then((result) => {
      if (result.value) {
        this.PaymentsService.deletePaymentById(id).subscribe(dato => {
          console.log(dato);
          this.obtenerPayment();
          swal(
            'Empleado eliminado',
            'El empleado ha sido eliminado con éxito',
            'success'
          )
        });
      }
    })
}
}

