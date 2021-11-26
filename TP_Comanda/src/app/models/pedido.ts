export class Pedido {
    id: string;
    correo: string;
    mesa_numero: number;
    producto_id: [{ id: string, quantity: number, price: number, name: string }] | null;
    date_created: number;
    estado: 'PENDIENTE' | 'CANCELADO' | 'ACEPTADO' | 'CONFIRMADO' | 'COBRAR' | 'COBRADO' | 'ENCUESTADO';
    descuento: boolean;
}

//  PENDIENTE: metre es quien asignará este estado
//  CANCELADO: mozo/cliente es quien asignará este estado
//  ACEPTADO: mozo es quien asignará este estado
//  CONFIRMADO: cliente es quien asignará este estado
//  COBRAR: cliente es quien asignará este estado
//  COBRADO: mozo es quien asignará este estado