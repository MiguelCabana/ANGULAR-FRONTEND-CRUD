import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor() { }



  crearSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  crear$ : Observable<string> = this.crearSubject.asObservable();

  
  actualizarSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  actualizar$ : Observable<string> = this.actualizarSubject.asObservable();

  editarSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  editar$ : Observable<string> = this.editarSubject.asObservable();
  
  eliminarSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  eliminar$ : Observable<string> = this.eliminarSubject.asObservable();

  errorSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  error$: Observable<string> = this.errorSubject.asObservable();


  desactivarAlertarMensajeCrear() {
    setTimeout(() => {
        this.crearSubject.next('');
    }, 3000);
  }

  desactivarAlertarMensajeActualizar() {
    setTimeout(() => {
        this.actualizarSubject.next('');
    }, 3000);
  }

  desactivarAlertarMensajeEditar() {
    setTimeout(() => {
        this.editarSubject.next('');
    }, 3000);
  }

  desactivarAlertarMensajEliminar() {
    setTimeout(() => {
        this.eliminarSubject.next('');
    }, 3000);
  }




  

  
}
