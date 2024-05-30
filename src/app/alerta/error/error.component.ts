import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../../services/mensaje.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="mensajeActivo" class="w-full text-sm mb-2">
        <p class = "w-96 mx-auto bg-red-200 p-4">{{mensaje}}</p>
    </div>
  `,
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

  mensajeActivo : boolean = false;
  mensaje : string = '';

  constructor(private mensajeServicie : MensajeService) {}

  ngOnInit(): void {
      this.mensajeServicie.errorSubject.subscribe( mensaje => {
        this.mensaje = mensaje;
        this.verificarMensaje();
      })
  }

  verificarMensaje() {
    if (this.mensaje !== null && this.mensaje !== '') {
      this.mensajeActivo = true;
    } else {
    this.mensajeActivo = false;
    }
  }

}
