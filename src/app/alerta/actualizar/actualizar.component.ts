import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../../services/mensaje.service';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="mensajeActivo" class="w-full text-sm mb-2">
        <p class = "w-96 mx-auto bg-green-200 p-4">{{mensaje}}</p>
    </div>
  `,
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent {

  constructor(private mensajeServicie : MensajeService){}
  
  mensajeActivo : boolean = false;
  mensaje : string = '';

  ngOnInit(): void {
      this.mensajeServicie.actualizarSubject.subscribe(mensaje => {
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
