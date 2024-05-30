import { Component, OnInit ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { Empleado } from '../interface/empleado';
import { MensajeService } from '../services/mensaje.service';
import { EmpleadoService } from '../services/empleado.service';
import { RouterModule , RouterLink,RouterLinkActive ,Router, Navigation } from '@angular/router';
import { ActualizarComponent } from '../alerta/actualizar/actualizar.component';
import { EliminarComponent } from '../alerta/eliminar/eliminar.component';
import { EliminarMensajeComponent } from '../alerta/eliminar/eliminar-mensaje/eliminar-mensaje.component';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive,ActualizarComponent,EliminarComponent,EliminarMensajeComponent],
  template: `
  <div class="w-full  mx-auto">
    
    <!-- FILTRO -->
    <div class="w-full p-4 ">
        <form class="w-full">
        <input class="w-4/6 border border-gray-300  " type="text" placeholder="Filtrar empleado" #filter>
        <button class="primary bg-gray-800 text-white hover:bg-gray-700 transition cursor-pointer p-2 mx-2 w-1/6" type="button" (click)="filtrar_resultado_empleado(filter.value)">Buscar</button>
        </form>    
    </div>
    

    <div class="w-full p-4">
        <form>
            <div class="text-sm">
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('todos')">Todos ({{contardor_empleado}})</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('primer_nombre')">Primer Nombre</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('otros_nombres')">Otros Nombres</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('primer_apellido')">Primer Apellido</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('segundo_apellido')">Segundo Apellido</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('tipo_identificacion')">Tipo de Identificación</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('numero_identificacion')">Número de Identificación</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('pais_empleo')">País del empleo</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('correo_electronico')">Correo electrónic</button>
                <button class="p-2 m-1 hover:bg-gray-300 transition cursor-pointer bg-gray-200" type="button" (click)="filtrar_resultado_empleado_columna('estado')">Estado</button>
            </div>
        </form>
    </div>

    <!-- COMPONENTE ALERTA ACTUALIZAR -->
    <app-eliminar></app-eliminar>

    <!-- ELIINAR MENSAJE COMPONENET -->
    <app-eliminar-mensaje></app-eliminar-mensaje>

    <!-- COMPONENTE ALERTA ELIMINAR --> 
    <app-eliminar  (eliminarSi)="eliminarSiConfirmado()" (eliminarCancelar)="eliminarNoConfirmado()" [botonPresionado]="botonPresionado"></app-eliminar>

    <div *ngIf="activarMensaje" class="p-4 m-2 text-sm">
        <div>{{mensajeDescripcion}}</div>
    </div>


    <div class="p-4 m-2 text-sm" *ngIf="columna_busqueda_estado">
        <h2>Resultado de la busqueda:</h2>
        <ul class="bg-gray-50 w-64 p-2 m-2 text-sm" *ngFor="let valor of columna_busqueda_valor">
            <li>{{valor}}</li>
        </ul>

        
    </div>

    <div *ngIf="filter_column_results" #restablecer_posicion_contenedor_filtro_empleado>

        
        
        <div *ngFor="let empleado of listaEmpleadosFiltrado"  class=" mt-2 flex justify-start flex-wrap  rounded-md p-4 border border-gray-100">

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Primer Apellido</div>
                <div>{{empleado.primer_apellido}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Segundo Apellido</div>
                <div>{{empleado.segundo_apellido}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Primer nombre</div>
                <div>{{empleado.primer_nombre}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Otros nombres</div>
                <div>{{empleado.otros_nombres}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Pais de empleo</div>
                <div>{{empleado.pais_empleo}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Tipo identificacion</div>
                <div>{{empleado.tipo_identificacion}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Numero Identificacion</div>
                <div>{{empleado.numero_identificacion}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Correo Electronico</div>
                <div>{{empleado.correo_electronico}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Fecha Ingreso</div>
                <div>{{empleado.fecha_ingreso}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Area</div>
                <div>{{empleado.area}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Estado</div>
                <div>{{empleado.estado}}</div>
            </div>

            <div class="bg-gray-50 w-64 p-2 m-2 text-sm">
                <div>Fecha & hora</div>
                <div>{{empleado.fecha_hora}}</div>
            </div>

            <div class="w-full mt-2">
                <div>
                <a  [routerLink]="['empleado/editar', empleado.id]" class="w-64 p-2 m-2 hover:bg-blue-600 transition cursor-pointer bg-blue-500 text-white rounded-md text-sm">Editar</a>
                <a  (click)="eliminarModalAbrir(empleado.id)" class="w-64 p-2 m-2 hover:bg-red-600 transition cursor-pointer bg-red-500 text-white rounded-md text-sm" >Eliminar</a>
                </div>
            </div>

            
        </div>
        
        <!-- Paginación -->

<div class=" w-full lg:w-3/6 mx-left  flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  <div class="flex flex-1 justify-between sm:hidden">
    <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
    <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
  </div>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{paginacion_de}}</span>
        to
        <span class="font-medium">{{paginacion_hasta}}</span>
        of
        <span class="font-medium">{{contardor_empleado}}</span>
        results
      </p>
    </div>
    <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a (click)="obtener_empleados_lista_avanza_retroceder(0)" class="relative inline-flex items-center rounded-l-md cursor-pointer px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </a>
        <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
        <a (click)="obtener_empleados_lista_diez(10)" #pagina1 class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 hover:text-white focus:z-20 focus:outline-offset-0">1</a>
        <a (click)="obtener_empleados_lista_diez(20)" #pagina2 class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer  ring-gray-300 hover:bg-gray-700 hover:text-white focus:z-20 focus:outline-offset-0">2</a>
        <a (click)="obtener_empleados_lista_diez(30)" #pagina3 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset  cursor-pointer ring-gray-300 hover:bg-gray-700 hover:text-white focus:z-20 focus:outline-offset-0 md:inline-flex ">3</a>
        <a (click)="obtener_empleados_lista_diez(40)" #pagina4 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 focus:z-20 hover:text-white focus:outline-offset-0 md:inline-flex ">4</a>
        <a (click)="obtener_empleados_lista_diez(50)" #pagina5 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 focus:z-20  hover:text-white focus:outline-offset-0 md:inline-flex ">5</a>
        <a (click)="obtener_empleados_lista_diez(60)" #pagina6 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 focus:z-20 hover:text-white focus:outline-offset-0 md:inline-flex ">6</a>
        <a (click)="obtener_empleados_lista_diez(70)" #pagina7 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 focus:z-20 hover:text-white focus:outline-offset-0 md:inline-flex ">7</a>
        <a (click)="obtener_empleados_lista_diez(80)" #pagina8 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 focus:z-20 hover:text-white focus:outline-offset-0 md:inline-flex ">8</a>
        <a (click)="obtener_empleados_lista_diez(90)" #pagina9 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 focus:z-20 hover:text-white focus:outline-offset-0 md:inline-flex ">9</a>
        <a (click)="obtener_empleados_lista_diez(100)" #pagina10 class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-inset cursor-pointer ring-gray-300 hover:bg-gray-700 focus:z-20 hover:text-white  focus:outline-offset-0 md:inline-flex ">10</a>

        <a (click)="obtener_empleados_lista_avanza_retroceder(1)" class="relative inline-flex items-center rounded-r-md px-2 py-2 cursor-pointer  text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </a>
      </nav>
    </div>
  </div>
</div>


        <!-- Paginación -->


    </div>
    
  </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {

    botonPresionado : boolean = false;

    mensajeActivo : boolean  = false;
    mensaje : string = '';

    listaEmpleados : Empleado[] = [];

    listaEmpleadosFiltrado : Empleado[] = [];

    contardor_empleado : number = 0;

    listaEmpleadoFiltradoColumna : any;

    columna_busqueda_valor : any;
    
    columna_busqueda_estado : boolean = false;

    filter_column_results : boolean = true; 

    paginacion_de : number = 0;
    paginacion_hasta : number = 0;

    activarMensaje : boolean = false;
    mensajeDescripcion : string = '';

    paginacion_atras : number = 0;
    paginacion_adelante : number = 0;

    posicion_actual : number = 0;

    @ViewChild('restablecer_posicion_contenedor_filtro_empleado') restablecer_posicion_contenedor_filtro_empleado? : ElementRef;

  // Utiliza ViewChild para obtener una referencia a cada enlace de número
    @ViewChild('pagina1') pagina1?: ElementRef;
    @ViewChild('pagina2') pagina2?: ElementRef;
    @ViewChild('pagina3') pagina3?: ElementRef;
    @ViewChild('pagina4') pagina4?: ElementRef;
    @ViewChild('pagina5') pagina5?: ElementRef;
    @ViewChild('pagina6') pagina6?: ElementRef;
    @ViewChild('pagina7') pagina7?: ElementRef;
    @ViewChild('pagina8') pagina8?: ElementRef;
    @ViewChild('pagina9') pagina9?: ElementRef;
    @ViewChild('pagina10') pagina10?: ElementRef;

    $apiUrl = 'http://localhost:8000/api/empleados';

    constructor(private http : HttpClient, private empleadoServicie : EmpleadoService, private mensajeServicie : MensajeService, private router : Router) {}

    ngOnInit(): void {
        this.http.get<any>(this.$apiUrl).subscribe({
            next : (response : any) => {
                console.log(response,"RESPUESTA DEL SERVIDOR");
                this.empleadoServicie.empleadoSubject.next(response.empleados);
                this.empleadoServicie.empleado$.subscribe(lista => {
                    this.listaEmpleados = lista;
                    this.listaEmpleadosFiltrado = lista;
                    this.contardor_empleado = this.listaEmpleadosFiltrado.length;
                    this.empleadoServicie.empleadoLista = lista;
                })
                console.log(this.listaEmpleados);
            }
        })
        this.obtener_empleados_lista_diez(10);
    }


    ngAfterViewInit(): void { 
        console.log(this.restablecer_posicion_contenedor_filtro_empleado,'cargado despues');
        this.pagina1?.nativeElement.classList.add('seleccionado');
        /*
        this.mensajeServicie.crearSubject.subscribe(mensaje => 
            this.mensaje = mensaje
        )

        */
 
    }

    almacenarIdParaEliminacion : number = 0;

    //Eliminar confirmacion
    eliminarModalAbrir(id : number) {
        this.botonPresionado = true;
        this.almacenarIdParaEliminacion = id;
    }

    eliminarSiConfirmado() {
        this.eliminarEmpleado(this.almacenarIdParaEliminacion);
       console.log("eliminar click botton confirmado");
       this.botonPresionado = false;
    }

    eliminarNoConfirmado() {
        this.botonPresionado = false;
    }


    //Eliminar empleado
    eliminarEmpleado (id : number) {
        // Llama al método del servicio para eliminar el empleado
        this.empleadoServicie.eliminarEmpleado(id);
        this.mensajeServicie.eliminarSubject.next('Empleado eliminado correctamente.') 
        this.mensajeServicie.desactivarAlertarMensajEliminar();
    }


    filtrar_resultado_empleado_columna(text : string) {

        const columnaNombre = text.toLowerCase();
        // Filtramos los empleados para cada columna y concatenamos los resultados
        this.filter_column_results = false;
        this.columna_busqueda_estado = true;

        switch (columnaNombre) {
            case 'primer_nombre':
                // Código a ejecutar si expresion es igual a valor1
                const columna_primer_nombre = this.listaEmpleados.map(columna => columna?.primer_nombre);
                this.columna_busqueda_valor = columna_primer_nombre;
                console.log(columna_primer_nombre);
                break;
            case 'otros_nombres':
                // Código a ejecutar si expresion es igual a valor1
                const columna_otros_nombres = this.listaEmpleados.map(columna => columna?.otros_nombres);
                this.columna_busqueda_valor = columna_otros_nombres;
                break;
            case 'primer_apellido':
                // Código a ejecutar si expresion es igual a valor1
                const columna_primer_apellido = this.listaEmpleados.map(columna => columna?.primer_apellido);
                this.columna_busqueda_valor = columna_primer_apellido;
                break;
            case 'segundo_apellido':
                // Código a ejecutar si expresion es igual a valor1
                const columna_segundo_apellido = this.listaEmpleados.map(columna => columna?.segundo_apellido);
                this.columna_busqueda_valor = columna_segundo_apellido;
                break;
            case 'tipo_identificacion':
                // Código a ejecutar si expresion es igual a valor1
                const columna_tipo_identificacion = this.listaEmpleados.map(columna => columna?.tipo_identificacion);
                this.columna_busqueda_valor = columna_tipo_identificacion;
                break;
            case 'numero_identificacion':
                // Código a ejecutar si expresion es igual a valor1
                const columna_numero_identificacion = this.listaEmpleados.map(columna => columna?.numero_identificacion);
                this.columna_busqueda_valor = columna_numero_identificacion;
                break;
            case 'pais_empleo':
                // Código a ejecutar si expresion es igual a valor1
                const columna_pais_empleo = this.listaEmpleados.map(columna => columna?.pais_empleo);
                this.columna_busqueda_valor = columna_pais_empleo;
                break;

            case 'correo_electronico':
                // Código a ejecutar si expresion es igual a valor1
                const columna_correo_electronico = this.listaEmpleados.map(columna => columna?.correo_electronico);
                this.columna_busqueda_valor = columna_correo_electronico;
                break;
            case 'estado':
                // Código a ejecutar si expresion es igual a valor1
                const columna_estado = this.listaEmpleados.map(columna => columna?.estado);
                this.columna_busqueda_valor = columna_estado;
                break;
                
            default:
                // Código a ejecutar si ninguno de los casos anteriores se cumple
                this.columna_busqueda_estado = false;
                this.filter_column_results = true;

                this.filtrar_resultado_empleado('');

                console.log(this.listaEmpleados, "LISTAAAAAAA");

        }



    }


    filtrar_resultado_empleado(text: string) {
        console.log('click');

        if (!text) {
          this.listaEmpleadosFiltrado = this.listaEmpleados;
          this.columna_busqueda_estado = false;
          this.filter_column_results = true;
          return;
        }


        console.log('2');
        

        this.columna_busqueda_estado = false;
        this.filter_column_results = true;


        this.listaEmpleadosFiltrado = this.listaEmpleados.filter(empleado =>
            empleado?.primer_apellido.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.segundo_apellido.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.primer_nombre.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.otros_nombres.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.tipo_identificacion.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.numero_identificacion.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.pais_empleo.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.correo_electronico.toLowerCase().includes(text.toLowerCase()) ||
            empleado?.estado.toLowerCase().includes(text.toLowerCase()) 
            // Agrega más condiciones de búsqueda según necesites
          );
      }


      obtener_empleados_lista_avanza_retroceder(number : number) {


        if(number === 0) {

            if(this.posicion_actual === 10) {
                this.obtener_empleados_lista_diez(10);
                console.log("hola 0");
            } else {
                this.posicion_actual =  this.posicion_actual - 10;
                console.log(this.posicion_actual, "posicion actual obtener empleados");
                this.obtener_empleados_lista_diez(this.posicion_actual);
            }

        } else if (number === 1) {

            if(this.posicion_actual === 100 ) {
                this.obtener_empleados_lista_diez(10);
                
            } else {
                this.posicion_actual =  this.posicion_actual + 10;
                console.log(this.posicion_actual, "posicion actual obtener empleados");
                this.obtener_empleados_lista_diez(this.posicion_actual);
            }


    

        } else {
            console.log("no existe ninguna posicion actual");
            this.obtener_empleados_lista_diez(this.posicion_actual);


        }
      }



      

    obtener_empleados_lista_diez(number : number) {
        this.quitarSeleccion();
        

        this.posicion_actual = number;
        
        switch (number) {
            case 10:
                // Código a ejecutar si la expresión es igual a valor1
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(0,number);
                this.pagina1?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 1;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop(); // Llamar al método scrollToTop() aquí
                break;
            case 20:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(10,number);
                this.pagina2?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 10;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop();
                break;
            case 30:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(20,number);
                this.pagina3?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 20;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }
                 this.scrollToTop();
                break;
            case 40:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(30,number);
                this.pagina4?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 30;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop();
                break;
            case 50:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(40,number);
                this.pagina5?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 40;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop();
                break;
            case 60:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(50,number);
                this.pagina6?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 50;
                this.paginacion_hasta = number;
                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }
                

                this.scrollToTop();
                break;
            case 70:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(60,number);
                this.pagina7?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 60;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop();
                break;
            case 80:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(70,number);
                this.pagina8?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 70;
                this.paginacion_hasta = number;


                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop();
                break;
            case 90:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(80,number);
                this.pagina9?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 80;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop();
                break;
            case 100:
                // Código a ejecutar si la expresión es igual a valor2
                this.listaEmpleadosFiltrado = this.listaEmpleados.slice(90,number);
                this.pagina10?.nativeElement.classList.add("seleccionado");
                this.paginacion_de = 90;
                this.paginacion_hasta = number;

                if (this.listaEmpleadosFiltrado.length === 0) {
                    this.activarMensaje = true;
                    this.mensajeDescripcion = 'No existen más empleados.';
                } else {
                    this.activarMensaje = false;
                    this.mensajeDescripcion = '';
                }

                this.scrollToTop();
                break;
            // Puedes agregar más casos según sea necesario
            default:
                // Código a ejecutar si ninguno de los casos anteriores se cumple
        }

    };


    scrollToTop() {
        if (this.restablecer_posicion_contenedor_filtro_empleado && this.restablecer_posicion_contenedor_filtro_empleado.nativeElement) {
            this.restablecer_posicion_contenedor_filtro_empleado.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log("ACTIVE SMOOTH UP");
        } else {
            console.log("Elemento no encontrado"); // Cambié "no encontrado elemento" a un mensaje de consola válido
        }
    }


      
  // Método para quitar la clase "seleccionado" de todos los enlaces de números
  quitarSeleccion() {
    this.pagina1?.nativeElement.classList.remove("seleccionado");
    this.pagina2?.nativeElement.classList.remove("seleccionado");
    this.pagina3?.nativeElement.classList.remove("seleccionado");
    this.pagina4?.nativeElement.classList.remove("seleccionado");
    this.pagina5?.nativeElement.classList.remove("seleccionado");
    this.pagina6?.nativeElement.classList.remove("seleccionado");
    this.pagina7?.nativeElement.classList.remove("seleccionado");
    this.pagina8?.nativeElement.classList.remove("seleccionado");
    this.pagina9?.nativeElement.classList.remove("seleccionado");
    this.pagina10?.nativeElement.classList.remove("seleccionado");
    // Quita la clase seleccionado de los demás enlaces de números aquí

    console.log("quitar sleeccion");
  }


}
