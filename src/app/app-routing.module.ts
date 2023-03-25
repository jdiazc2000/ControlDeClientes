import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { LoginComponent } from './components/login/login.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path:'table',
    component:TableComponent,
    children:[
      {
        path:'clientes',
        component: ClientesComponent
      }
    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'registrarse',
    component:RegistroComponent
  },
  {
    path:'configuracion',
    component:ConfiguracionComponent
  },
  {
    path:'cliente/editar/:id',
    component:EditarClientesComponent
  },
  {
    path:'**',
    component:NoEncontradoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
