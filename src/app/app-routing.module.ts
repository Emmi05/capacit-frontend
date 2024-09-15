import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './components/empleado/lista-empleados/lista-empleados.component';
import { RegistrarEmpleadoComponent } from './components/empleado/registrar-empleado/registrar-empleado.component';
import { ActualizarEmpleadoComponent } from './components/empleado/actualizar-empleado/actualizar-empleado.component';
import { DetalleEmpleadoComponent } from './components/empleado/detalle-empleado/detalle-empleado.component';
import { ListarClientesComponent } from './components/cliente/listar-clientes/listar-clientes.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';
import { ListarPedidosComponent } from './components/pedido/listar-pedidos/listar-pedidos.component';
import { PaymentsComponent } from './components/payments/lista-payments/payments.component'; // mi componente ts
import { DetallePaymentComponent } from './components/payments/detalle-payment/detalle-payment.component'; // mi componente ts
import { ActualizarPaymentComponent } from './components/payments/actualizar-payment/actualizar-payment.component'; // mi componente ts

//aqui se configuran las rutas URL a donde tienen que redireccionar (componentes)

const routes: Routes = [
  {path : 'empleados',component:ListaEmpleadosComponent},
  {path : '',redirectTo:'empleados',pathMatch:'full'},
  {path : 'registrar-empleado',component : RegistrarEmpleadoComponent},
  {path : 'actualizar-empleado/:id',component : ActualizarEmpleadoComponent},
  {path : 'detalle-empleado/:id',component : DetalleEmpleadoComponent},
  {path : 'clientes', component:ListarClientesComponent},
  {path : 'actualizar-cliente/:id', component : ActualizarClienteComponent},
  {path : 'pedidos', component : ListarPedidosComponent},
  {path: 'payments', component: PaymentsComponent },
  {path: 'detalle-payment/:id', component: DetallePaymentComponent },
  {path: 'actualizar-payment/:id', component: ActualizarPaymentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
