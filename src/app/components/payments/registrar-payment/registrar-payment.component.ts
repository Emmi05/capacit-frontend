import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDTO, ClienteDTO } from '../../../models/payment/payment'; // Modelo de pago
import { PaymentsService } from '../../../servicios/payment/payments.service'; // Servicio de pagos
import { ClienteService } from '../../../servicios/cliente/cliente.service'; // Servicio de clientes
import swal from 'sweetalert2'; // Importar correctamente SweetAlert2

@Component({
  selector: 'app-registrar-payment',
  templateUrl: './registrar-payment.component.html',
  styleUrls: ['./registrar-payment.component.css']
})
export class RegistrarPaymentComponent implements OnInit {

  payment: PaymentDTO = { id: 0, paymentDate: '', amountPaid: 0, paymentMethod: '', cliente: { id: 0, nombre: '', direccion: '', correo: '', telefono: '' } };
  filteredClients: ClienteDTO[] = []; // Definir la propiedad para la lista de clientes

  constructor(
    private paymentsService: PaymentsService,
    private clienteService: ClienteService, // Inyectar el servicio de clientes
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe(clientes => {
      this.filteredClients = clientes; // Asignar la lista de clientes a la propiedad
    }, error => {
      console.error(error);
      swal({
        title: 'Error',
        text: 'Ocurrió un error al cargar los clientes.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  guardarPayment() {
    this.paymentsService.createPayment(this.payment).subscribe(dato => {
      console.log(dato);
      swal({
        title: '¡Éxito!',
        text: 'Pago registrado exitosamente.',
        type: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.irALaListaDePayments();
    }, error => {
      console.error(error);
      swal({
        title: 'Error',
        text: 'Ocurrió un error al registrar el pago.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  irALaListaDePayments() {
    this.router.navigate(['/payments']);
  }

  onSubmit() {
    this.guardarPayment();
  }
}
