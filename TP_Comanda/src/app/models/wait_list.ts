export class WaitList {
    id: string;
    estado: 'ACTIVO' | 'EN USO' | 'CANCELADO';
    correo: string;
    date_created: number;
}