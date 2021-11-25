import { Injectable } from '@angular/core';
import { User } from '../models/user';

import emailjs from 'emailjs-com';
import { init } from "emailjs-com";
init("user_CK2ZPMj0FfV6wbMKMOi4k");

@Injectable({
    providedIn: 'root'
})

export class MailService {

    private serviceID = "service_ux9vc9r";
    private templateID = "template_21jie42";

    constructor() { }

    notificationWelcome(model: User) {
        let template = {
            from: "ARM Group",
            to: model.correo,
            client_name: model.nombre,
            message: "Si recibió este correo electrónico significa que se ha registrado correctamente en ARM GROUP muchas gracias!",
        }

        try { emailjs.send(this.serviceID, this.templateID, template) }
        catch (error) { console.log("Error al enviar el email.", error); }
    }

    notificationInabled(model: User) {
        let template = {
            from: "ARM Group",
            to: model.correo,
            client_name: model.nombre,
            message: "Para acceder a la aplicacion debe aguardar a que su cuenta sea activada",
        }

        try { emailjs.send(this.serviceID, this.templateID, template) }
        catch (error) { console.log("Error al enviar el email.", error); }
    }

    notificationStatus(model: User) {
        let template = {
            from: "ARM Group",
            to: model.correo,
            client_name: model.nombre,
            message: "Usted se encuentra actualmente en estado" + model.estado + " para ingresar al local ARM Group",
        }

        try { emailjs.send(this.serviceID, this.templateID, template) }
        catch (error) { console.log("Error al enviar el email.", error); }
    }
}