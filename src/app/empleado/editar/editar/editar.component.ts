import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder,Validators,ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';
import { Empleado } from '../../../interface/empleado';
import { EmpleadoService } from '../../../services/empleado.service';
import { MensajeService } from '../../../services/mensaje.service';
import { ActivatedRoute, Router , RouterLink, RouterModule } from '@angular/router';
import { ActualizarComponent } from '../../../alerta/actualizar/actualizar.component';
import { ErrorComponent } from '../../../alerta/error/error.component';
import { error } from 'console';



@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, RouterLink,RouterModule,ActualizarComponent,ErrorComponent],
  template: `


  <!-- ALERTAR COMPONENTE ACTUALIZAR -->
  <app-actualizar></app-actualizar>
  <!-- ALERTA COMPONENET ERROR -->
  <app-error></app-error>

  <div class="w-96 mx-auto mb-4">
  <form  method="post"  (ngSubmit) ="editarEmpleadoSubmit()">

    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Informacion personal</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">Utilice una dirección permanente donde pueda recibir correo.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Primer Apellido</label>
            <div class="mt-2">
              <input type="text"  name="primer_apellido" id="first-name"   [(ngModel)]="formularioDatosEmpleado.primer_apellido"   autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Segundo apellido</label>
            <div class="mt-2">
              <input type="text"  name="segundo_apellido" id="last-name"   [(ngModel)]="formularioDatosEmpleado.segundo_apellido"    autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Primer nombre</label>
            <div class="mt-2">
              <input type="text" name="primer_nombre"  id="last-name" [(ngModel)]="formularioDatosEmpleado.primer_nombre"  autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Otros nombres</label>
            <div class="mt-2">
              <input type="text" name = "otros_nombres" id="last-name"  [(ngModel)]="formularioDatosEmpleado.otros_nombres"  autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          
          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Pais de empleo</label>
            <div class="mt-2">
              <select id="country" name="pais_empleo"     autocomplete="country-name"  [(ngModel)]="formularioDatosEmpleado.pais_empleo" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>Estados Unidos</option>
                <option>Colombia</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Tipo identificacion</label>
            <div class="mt-2">
              <select id="country"  name="tipo_identificacion" [(ngModel)]="formularioDatosEmpleado.tipo_identificacion"   autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>Cédula de Ciudadanía</option>
                <option>Cédula de Extranjería</option>
                <option>Pasaporte</option>
                <option>Permiso Especial</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name"  class="block text-sm font-medium leading-6 text-gray-900">Numero Identificacion</label>
            <div class="mt-2">
              <input type="text" name="numero_identificacion" [(ngModel)]="formularioDatosEmpleado.numero_identificacion"    id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          


          <div class="sm:col-span-3">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo Electronico</label>
            <div class="mt-2">
              <input id="email"   disabled name="correo_electronico" type="email"  [(ngModel)]="formularioDatosEmpleado.correo_electronico"   autocomplete="email" class="disabled block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Fecha Ingreso</label>
            <div class="mt-2">
              <input id="date" name="fecha_ingreso"  type="date"   [(ngModel)]="formularioDatosEmpleado.fecha_ingreso"   autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Area</label>
            <div class="mt-2">
              <select id="country"  name="area"      [(ngModel)]="formularioDatosEmpleado.area"     autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>Administración</option>
                <option>Financiera</option>
                <option>Compras</option>
                <option>Infraestructura</option>
                <option>Operación</option>
                <option>Talento Humano</option>
                <option>Servicios Varios</option>
              </select>
            </div>
          </div>



        </div>
      </div>

    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button  routerLink="/" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  </form>
  </div>
  
  `,
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {

  apiUrl = 'http://localhost:8000/api/empleados';

  listaEmpleado : Empleado[] = [];

  empleadoEncontrado?: Empleado;

  //editarEmpleadoFormulario : FormGroup;

  //empleado: any; // Variable para almacenar los datos del empleado

  empleado : boolean = true;

  nombre : string = '';


  constructor(private formBuilder : FormBuilder , private route : ActivatedRoute, private router : Router, private http : HttpClient , private empleadoServicie : EmpleadoService, private mensajeServicie : MensajeService) {
    
    /*
    
    this.editarEmpleadoFormulario = this.formBuilder.group({
      primer_apellido : ['',],
      segundo_apellido : ['', ],
      primer_nombre : ['', ],
      otros_nombres : ['', ],
      pais_empleo : ['', ],
      tipo_identificacion : ['', ],
      //numero_identificacion : [ ],
      //correo_electronico : ['', ],
      fecha_ingreso : ['', ],
      area : ['', ],
    })

    */
  }



  
  

  //idEmpleado? : string | null;

  idEmpleado? : number | null;
  
  empleadoActualObtenido? : any;


  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');
      if(id) {
        this.idEmpleado = parseInt(id);
        this.empleadoActualObtenido = this.empleadoServicie.empleadoLista.find(empleado => empleado.id === this.idEmpleado);
        console.log(this.idEmpleado,'ID EMPLEADO');
        console.log(this.empleadoActualObtenido,'EMPLADO OBTENIDO');

        this.formularioDatosEmpleado = {

          primer_apellido : this.empleadoActualObtenido?.primer_apellido,
          segundo_apellido : this.empleadoActualObtenido?.segundo_apellido,
          primer_nombre : this.empleadoActualObtenido?.primer_apellido,
          otros_nombres : this.empleadoActualObtenido?.otros_nombres,
          pais_empleo : this.empleadoActualObtenido?.pais_empleo,
          tipo_identificacion : this.empleadoActualObtenido?.tipo_identificacion,
          numero_identificacion : this.empleadoActualObtenido?.numero_identificacion,
          correo_electronico : this.empleadoActualObtenido?.correo_electronico,
          fecha_ingreso : this.empleadoActualObtenido?.fecha_ingreso,
          area : this.empleadoActualObtenido?.area,
        }
      }

    })

  }


  formularioDatosEmpleado : any ;
  
  

  editarEmpleadoSubmit() {

    if(this.idEmpleado && this.formularioDatosEmpleado !== null) {
      const url = `${this.apiUrl}/${this.idEmpleado}`;

      this.http.put<any>(url,this.formularioDatosEmpleado).subscribe({
        next : (response : any) => {
          console.log(response,'RESPUESTA DEL SERVIDOR');
            const status = response.status;
            if  (status === 200) {
                this.mensajeServicie.actualizarSubject.next(`${response.empleados.correo_electronico} ${'actualizado correctamente'}`);
                this.formularioDatosEmpleado.correo_electronico = response.empleados.correo_electronico;
                //this.router.navigate(['']);
            }
        },error : (error : HttpErrorResponse) => {
            for(let key in error.error.errors) {
              if(error.error.errors.hasOwnProperty(key)) {
                this.mensajeServicie.errorSubject.next(error.error.errors[key][0]);
              }
            }
        }, complete : () => {
            this.mensajeServicie.desactivarAlertarMensajeActualizar();
        }
      })

    }
    




    
  }
  



}
