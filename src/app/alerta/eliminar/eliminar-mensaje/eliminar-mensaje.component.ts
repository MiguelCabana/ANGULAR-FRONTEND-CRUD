import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../../../services/mensaje.service';

@Component({
  selector: 'app-eliminar-mensaje',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="mensajeActivo" class="w-full text-sm m-4 ">
        <p class = "w-96 mx-left bg-red-200 p-4">{{mensaje}}</p>
    </div>
  `,
  styleUrl: './eliminar-mensaje.component.css'
})
export class EliminarMensajeComponent {
  
  constructor(private mensajeServicie : MensajeService){}
  
  mensajeActivo : boolean = false;
  mensaje : string = '';

  ngOnInit(): void {
      this.mensajeServicie.eliminarSubject.subscribe(mensaje => {
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
