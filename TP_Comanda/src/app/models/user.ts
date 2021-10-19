export abstract class User {
    id: string; //path of firebase's doc
    nombre: string;
    apellido: string;
    dni: number;
    img: string;
    estado: 'ACTIVO' | 'INACTIVO' | 'PENDIENTE' | 'INACTIVO';
    correo: string;
    fecha_creacion: number; //datetime in miliseconds
}