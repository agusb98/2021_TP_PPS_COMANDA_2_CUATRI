export class Pedido {
    id: string;
    correo: string;
    mesa_numero: number;
    producto_id: string;
    date_created: number;
    estado: 'PENDIENTE' | 'CANCELADO' | 'ACEPTADO' | 'CONFIRMADO' | 'COBRAR' | 'COBRADO';
}

//  PENDIENTE: metre es quien asignará este estado
//  CANCELADO: mozo/cliente es quien asignará este estado
//  ACEPTADO: mozo es quien asignará este estado
//  CONFIRMADO: cliente es quien asignará este estado
//  COBRAR: cliente es quien asignará este estado
//  COBRADO: mozo es quien asignará este estado