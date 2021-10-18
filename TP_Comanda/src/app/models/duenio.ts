import { User } from "./user";

export class Duenio extends User{ 
    perfil = 'DUENIO';
    estado: 'ACTIVO' | 'INACTIVO';
    cuil: number;
}