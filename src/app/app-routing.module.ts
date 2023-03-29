import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
//import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
//import { RegistroComponent } from './components/registro/registro.component';
import { TableComponent } from './components/table/table.component';
import { AuthGuardian } from './guadians/auth.guard';

const routes: Routes = [
  {
    path:'table',
    component:TableComponent,
    canActivate: [AuthGuardian]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:"register",
    component:RegistroComponent
  },
  {
    path:'configuracion',
    component:ConfiguracionComponent
  },
  {
    path:'cliente/editar/:id',
    component:EditarClientesComponent,
    canActivate: [AuthGuardian]
  },
  {
    path:'**',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
