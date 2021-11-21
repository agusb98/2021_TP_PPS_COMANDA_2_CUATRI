export class WaitList {
    id: string;
    estado: 'PENDIENTE' | 'EN USO' | 'CANCELADO';
    correo: string;
    date_created: number;
}