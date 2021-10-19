import { User } from "./user";

export class Anonimo extends User {
    apellido = null;
    dni = null;
    correo = null;
    perfil: 'ANONIMO' = 'ANONIMO';
}