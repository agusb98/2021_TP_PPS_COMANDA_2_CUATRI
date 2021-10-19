import { User } from "./user";

export class Supervisor extends User {
    perfil: 'SUPERVISOR' = 'SUPERVISOR';
    cuil: number;
}