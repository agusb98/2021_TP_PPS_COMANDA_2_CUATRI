export abstract class User {
    id: string; //path of firebase's doc
    nombre: string;
    apellido: string;
    dni: string;
    img: string;
    estado: string;
    correo: string;
    perfil: string;
    fecha_creacion: number; //datetime in miliseconds
}