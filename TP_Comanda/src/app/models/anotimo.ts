export class Anonimo {
    id: string; //path of firebase's doc
    nombre: string;
    img: string;
    estado: 'ACTIVO' | 'INACTIVO' | 'PENDIENTE' | 'INACTIVO';
    fecha_creacion: number; //datetime in miliseconds
    perfil: 'CLIENTE' = 'CLIENTE';
}