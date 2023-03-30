import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy,untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss'],
})
export class EditarClientesComponent implements OnInit{
  id: string 
  PageReady:boolean = true
  closeResult = '';
  
  cliente: Cliente  = {
    nombre: '',
    apellido: '',
    correo: '',
    saldo: 0 
  }

  constructor(private clienteService: ClienteService,
              private router: Router,
              private route: ActivatedRoute,
              private toasterService: ToasterService,
              private modalService: NgbModal,){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.clienteService.getCliente(this.id).pipe(untilDestroyed(this)).subscribe(cliente => {
      if(cliente !== null){
        this.cliente = cliente
        this.PageReady = false
      }else{
        this.router.navigate(["table"])
      }

    })
  }

  VolverHome(){
    this.router.navigate(["clientes"])
  }

  EditarCliente({value, valid}: {value: Cliente, valid: boolean | null}){
    if(!valid){   
      return this.toasterService.ActiveToaster("error","Error al editar el cliente","Llenar el formulario correctamente.")
    }else{
      value.id = this.id
      this.clienteService.modificarCliente(value)
      this.toasterService.ActiveToaster("success","Cliente editado de manera correcta",`El cliente ${value.nombre} fue editado con éxito.`)
      return this.router.navigate(["clientes"])
    }
  }

  EliminarCliente(){
    let dataId = this.route.snapshot.params['id']
    this.clienteService.deleteCliente(dataId)
    this.toasterService.ActiveToaster("success","Cliente eliminado de manera correcta",`El cliente fue eliminado con éxito.`)
    return this.router.navigate(["clientes"])
  }


  //Modal Functions
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
