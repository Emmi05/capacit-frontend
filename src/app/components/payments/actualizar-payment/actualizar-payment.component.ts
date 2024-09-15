import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDTO, ClienteDTO } from '../../../models/payment/payment'; // Modelo de pago
import { PaymentsService } from '../../../servicios/payment/payments.service'; // Servicio de pagos
import { ClienteService } from '../../../servicios/cliente/cliente.service'; // Servicio de clientes
import swal from 'sweetalert2'; // Importar correctamente SweetAlert2

@Component({
  selector: 'app-actualizar-payment',
  templateUrl: './actualizar-payment.component.html',
  styleUrls: ['./actualizar-payment.component.css']
})
export class ActualizarPaymentComponent implements OnInit {
  payment: PaymentDTO = { id: 0, paymentDate: '', amountPaid: 0, paymentMethod: '', cliente: { id: 0, nombre: '', direccion: '', correo: '', telefono: '' } };
  clients: ClienteDTO[] = []; // Lista de clientes
  id: number;

  constructor(
    private paymentsService: PaymentsService,
    private clienteService: ClienteService,  // Inyectar servicio de cliente
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getPaymentDetails();
    this.getClients();  // Llamada para obtener la lista de clientes
  }

  getPaymentDetails(): void {
    this.paymentsService.getPaymentById(this.id).subscribe(
      (data: PaymentDTO) => {
        this.payment = data;
      },
      error => {
        console.error('Error al obtener el pago:', error);
      }
    );
  }

  getClients(): void {
    this.clienteService.listarClientes().subscribe(
      (clients: ClienteDTO[]) => {
        this.clients = clients;
      },
      error => {
        console.error('Error al obtener la lista de clientes:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.payment.amountPaid <= 0) {
       swal({
            title: 'Error',
            text: 'Amount Paid must be greater than 0.',
           type: 'error',
            confirmButtonText: 'Aceptar'
        });
        return; // Detiene el proceso si la validación falla
    }

    const methodPattern = /^[A-Za-z0-9 ]+$/;
    if (!methodPattern.test(this.payment.paymentMethod)) {
       swal({
            title: 'Error',
            text: 'Método de Pago contiene caracteres especiales.',
           type: 'error',
            confirmButtonText: 'Aceptar'
        });
        return; // Detiene el proceso si la validación falla
    }

    this.paymentsService.updatePayment(this.id, this.payment).subscribe(
        () => {
           swal({
                title: '¡Éxito!',
                text: 'Pago actualizado exitosamente.',
               type: 'success',
                confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/payments']); // Redirige a la lista de pagos
        },
        error => {
            console.error('Error al actualizar el pago:', error);
           swal({
                title: 'Error',
                text: 'Hubo un problema al actualizar el pago.',
               type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    );
}



}

