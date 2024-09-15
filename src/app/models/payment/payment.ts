export interface ClienteDTO {
    id: number;
    nombre: string;
    direccion: string;
    correo: string;
    telefono: string;
  }
  
  export interface PaymentDTO {
    id: number;
    paymentDate: string;  // Suponiendo que es una cadena en formato ISO
    amountPaid: number;
    paymentMethod: string;
    cliente: ClienteDTO; // Estructura del cliente
  }
  
