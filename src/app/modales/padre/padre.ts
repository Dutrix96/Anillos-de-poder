import { Component } from '@angular/core';
import { ConfirmarPopup } from '../confirmar-popup/confirmar-popup';
import { ConfiguracionPopup } from '../../interfaces/configuracion-popup';

@Component({
  selector: 'app-padre',
  imports: [ConfirmarPopup],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {
    parametrosModal: ConfiguracionPopup = {
        message : "Me confirmas la confirmacion?",
        header : "pa casa",
        nameButton: "lo que quieras",
        severity: "success"
    }
}