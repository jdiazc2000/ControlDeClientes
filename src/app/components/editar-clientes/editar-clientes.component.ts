import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss']
})
export class EditarClientesComponent implements OnInit{
  id: string 
  PageReady:boolean = true
  cliente: Cliente  = {
    nombre: '',
    apellido: '',
    correo: '',
    saldo: 0 
  }

  constructor(private clienteService: ClienteService,
              private toast: NgToastService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.clienteService.getCliente(this.id).subscribe(cliente => {
      if(cliente !== null){
        this.cliente = cliente
        this.PageReady = false
      }else{
        this.router.navigate(["table"])
      }

    })
  }

  SendNotification(){
    return this.toast.success({
      detail: 'Carga de datos exitosa',
      summary: `${this.cliente.nombre + ' ' + this.cliente.apellido} cargo con éxito.`,
    });
  }

  VolverHome(){
    this.router.navigate(["table"])
  }

  EditarCliente({value, valid}: {value: Cliente, valid: boolean | null}){
    if(!valid){   
      return this.toast.error({
        detail: 'Error al editar el cliente',
        summary: `Llenar el formulario correctamente.`,
      });
    }else{
      value.id = this.id
      //Modificar el cliente
      this.clienteService.modificarCliente(value)
      this.router.navigate(["table"])
    }
  }

  EliminarCliente(){
    let dataId = this.route.snapshot.params['id']
    this.clienteService.deleteCliente(dataId)
    this.router.navigate(["table"])
  }

}
