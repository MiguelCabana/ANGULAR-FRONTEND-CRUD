import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="botonPresionado" class="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center m-4 text-sm">
    <div class="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-10"></div> <!-- Fondo oscuro -->
       <div class="w-80  bg-white p-2 z-40 rounded-md" >
          <div class="w-full">
            <p>¿Desear eliminar el empleado?</p>
          </div>
          <div class="w-full flex justify-between">
              <button (click)="clickEliminarSi()" class="w-1/2 p-2 m-1 bg-red-500 hover:bg-red-600 text-white transition">Si</button>
              <button (click)="clickEliminarCancelar()" class="w-1/2 p-2 m-1 bg-gray-700 text-white hover:bg-gray-800 transition">Cancelar</button>
          </div>
       </div>
    </div>
  `,
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent {

  constructor(){}
  
  ngOnInit(): void {
  
  }


  @Input() botonPresionado: boolean = false

  @Output() eliminarSi : EventEmitter<void> = new EventEmitter<void>();
  @Output() eliminarCancelar : EventEmitter<void> = new EventEmitter<void>();

  clickEliminarSi() {
    this.eliminarSi.emit();
  }

  clickEliminarCancelar() {
    this.eliminarCancelar.emit();
  }
  
}
