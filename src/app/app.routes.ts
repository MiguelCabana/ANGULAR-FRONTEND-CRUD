import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { LoginComponent } from './login/login.component';
import { EditarComponent } from './empleado/editar/editar/editar.component';





export const routes: Routes = [

    {path: '', component : HomeComponent, title: 'Inicio'},
    {path: 'empleado', component : EmpleadoComponent, title: 'Empleado'},
    {path: 'login', component : LoginComponent, title: 'Login'},
    {path:'empleado/editar/:id', component:EditarComponent, title: 'Editar'},


];
