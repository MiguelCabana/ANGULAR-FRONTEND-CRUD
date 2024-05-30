import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Empleado } from '../interface/empleado';
import { RouterLink } from '@angular/router';
import { CrearComponent } from '../alerta/crear/crear.component';
import { MensajeService } from '../services/mensaje.service';
import { ErrorComponent } from '../alerta/error/error.component';



@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink,CrearComponent,ErrorComponent],
  template: `
  
  <!-- ALERTAR CREAR COMPONENTE -->
  <app-crear></app-crear>
  <!-- ALERTAR ERROR COMPONENT -->
  <app-error></app-error>

  <!-- SPINNER DE ESPERA DE RESPUESTA DEL SERVIDOR -->
  <div *ngIf="activarSpinner" class="mb-4">
    <svg class="text-gray-300 animate-spin mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
          width="24" height="24">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
          </path>
    </svg>
  </div>

  <div class="w-96 mx-auto mb-4 border p-4">
  <form [formGroup]="registrarEmpleadoFormulario" method="post"  (ngSubmit) ="registrarEmpleadoSubmit()">
  
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Informacion personal</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">Utilice una dirección permanente donde pueda recibir correo.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Primer Apellido</label>
            <div class="mt-2">
              <input type="text"  name="primer_apellido" id="first-name" formControlName = "primer_apellido" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
          
          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Segundo apellido</label>
            <div class="mt-2">
              <input type="text"  name="segundo_apellido" id="last-name" formControlName = "segundo_apellido" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Primer nombre</label>
            <div class="mt-2">
              <input type="text" name="primer_nombre"  id="last-name" formControlName = "primer_nombre" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Otros nombres</label>
            <div class="mt-2">
              <input type="text" name = "otros_nombres" id="last-name" formControlName = "otros_nombres" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          
          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Pais de empleo</label>
            <div class="mt-2">
              <select id="country" name="pais_empleo" formControlName = "pais_empleo" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Colombia">Colombia</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Tipo identificacion</label>
            <div class="mt-2">
              <select id="country"  name="tipo_identificacion"  formControlName = "tipo_identificacion" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
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
              <input type="text" name="numero_identificacion"  formControlName = "numero_identificacion" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          

          <!--
          <div class="sm:col-span-3">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo Electronico</label>
            <div class="mt-2">
              <input id="email"  name="correo_electronico" type="email" formControlName = "correo_electronico"  autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
          -->
          <div class="sm:col-span-3">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Fecha Ingreso</label>
            <div class="mt-2">
              <input id="date" name="fecha_ingreso"  type="date" formControlName = "fecha_ingreso" autocomplete="fecha" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Area</label>
            <div class="mt-2">
              <select id="country"  name="area" formControlName = "area" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
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
      <button routerLink="/" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  </form>
  </div>

  `,
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {

  apiUrl = 'http://localhost:8000/api/empleados';

  registrarEmpleadoFormulario : FormGroup;
  activarSpinner : boolean = false;

  constructor(private formBuilder : FormBuilder , private httpClient : HttpClient, private mensajeServicie : MensajeService) {
    
    this.registrarEmpleadoFormulario = this.formBuilder.group({
      primer_apellido : ['',Validators.required],
      segundo_apellido : ['', Validators.required],
      primer_nombre : ['', Validators.required],
      otros_nombres : ['', Validators.required],
      pais_empleo : ['', Validators.required],
      tipo_identificacion : ['', Validators.required],
      numero_identificacion : ['', Validators.required],
      //correo_electronico : ['', Validators.required],
      fecha_ingreso : ['', Validators.required],
      area : ['', Validators.required],
    })
  }


  registrarEmpleadoSubmit(){
    if (this.registrarEmpleadoFormulario.valid) {
      const formData = this.registrarEmpleadoFormulario.value;
      console.log(formData); // Muestra los valores del formulario en la consola
      this.enviarDatosAlBackend(formData); // Envía los datos al backend
    }
  }


  enviarDatosAlBackend(formData : Empleado ) {
    this.activarSpinner = true;

    // Aquí puedes usar HttpClient para enviar los datos al backend API
    this.httpClient.post<any>(this.apiUrl, formData).subscribe({
      next : (response : any) =>{
        if(response.status === 201) {
          this.mensajeServicie.crearSubject.next('Empleado creado correctamente.')
          this.mensajeServicie.errorSubject.next('');
          this.activarSpinner = false;
        }
        
      }, error : (error : HttpErrorResponse) => {
        this.activarSpinner = false;
        this.mensajeServicie.errorSubject.next(error.error.message);

            // Iterar sobre las claves del objeto 'errors'
    for (let key in error.error.errors) {
      if (error.error.errors.hasOwnProperty(key)) {
          console.log("Campo con error:", key); // Nombre del campo que generó el error
          console.log("Mensaje de error:", error.error.errors[key][0]); // Mensaje de error específico para ese campo
          this.mensajeServicie.errorSubject.next(error.error.errors[key][0]);
          this.mensajeServicie.crearSubject.next('');
      }
  }

        console.log(error.message);
      },complete : () => {
        console.log("complete");
        this.activarSpinner = false;
        this.mensajeServicie.desactivarAlertarMensajeCrear();
      }
    });
    }

  ngOnInit(): void {
      
  }

  

}
