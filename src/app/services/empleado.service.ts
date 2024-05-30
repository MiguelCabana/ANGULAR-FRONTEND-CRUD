import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empleado } from '../interface/empleado';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  
  constructor( private http : HttpClient) {}

  apiUrl = 'http://localhost:8000/api/empleados';

  empleadoLista : Empleado[] = [];
  empleadoSubject : BehaviorSubject<Empleado[]> = new BehaviorSubject<Empleado[]>([]);
  empleado$ : Observable<Empleado[]> = this.empleadoSubject.asObservable();



  //Metodo para eliminar un empleado
  eliminarEmpleado(id : number) {

  this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe({
    next : (response : any) => {
      console.log(response);
      this.actualizarListaEmpleado();
    },error : (error : HttpErrorResponse) => {
      console.log(error);
    },complete : () => {
      console.log("complete");
    }
    });
  }


  //Actualizar lista de empleado
  actualizarListaEmpleado() {
    this.http.get<any>(this.apiUrl).subscribe({
      next : (response : any) => {
        this.empleadoSubject.next(response.empleados);
      }
    })
  }
  



}
