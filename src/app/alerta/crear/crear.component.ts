import { Component } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="mensajeActivo" class="w-full text-sm mb-2 ">
        <p class = "w-96 mx-auto bg-green-200 p-4">{{mensaje}}</p>
    </div>
  `,
  styleUrl: './crear.component.css'
})
export class CrearComponent {

  constructor(private mensajeServicie : MensajeService){}
  
  mensajeActivo : boolean = false;
  mensaje : string = '';

  ngOnInit(): void {
      this.mensajeServicie.crearSubject.subscribe(mensaje => {
        this.mensaje = mensaje;
        this.habilitarMensaje();
        });
  }

  habilitarMensaje() {
    
    if (this.mensaje !== null && this.mensaje !== '') {
      this.mensajeActivo = true;
    } else {
    this.mensajeActivo = false;
    }
  }
}
