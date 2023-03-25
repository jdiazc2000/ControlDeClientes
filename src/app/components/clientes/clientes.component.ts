import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgToastService } from 'ng-angular-popup';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes!: Cliente[];
  clienteslength: number = 0;
  LoadingMessage: string = 'Cargando..';
  PageReady:boolean = true
  closeResult = '';
  
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0 
  }

  @ViewChild('clienteForm', {static: true}) eForm: NgForm;
  @ViewChild('f', {static: true}) eForm2: NgForm;

  constructor(
    private clientesService: ClienteService,
    private toast: NgToastService,
    private modalService: NgbModal
  ){}

  ngOnInit() {
    this.clientesService.getClientes().subscribe(
      (clientesData) => {
        if (clientesData !== undefined) {
          this.clientes = clientesData;
          this.clienteslength = clientesData.length;
          this.LoadingMessage = 'No se encontraron datos';
        }

        if (this.clientes !== undefined) {
          this.LoadDataOk();
        } else {
          this.LoadDataError();
        }

        return this.PageReady = false
      },
      (err) => {
        return console.log(err);
      }
    );
  }

  getClientesSize(): number {
    return this.clienteslength;
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo!;
      });
    }
    return saldoTotal;
  }
  
  @ViewChild('closebutton') closebutton: any;

  AgregarCliente({value, valid}: {value: Cliente, valid: boolean | null}){
    if(!valid){
      console.log(this.eForm)
      console.log(this.eForm2)
      return this.toast.error({
        detail: 'Error al agregar el cliente',
        summary: `Llenar el formulario correctamente.`,
      });
    }else{
      //this.clientesService.agregarCliente(value);
      //this.modalService.dismissAll(this.modalService);
      //NO RESETEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
   
    }
  }

  LoadDataOk() {
    if(this.clientes.length === 1){
      return this.toast.success({
        detail: 'Mensaje de éxito',
        summary: `${this.clienteslength} Cliente fue cargado.`,
      });
    }else{
      return this.toast.success({
        detail: 'Mensaje de éxito',
        summary: `${this.clienteslength} Clientes fueron cargados.`,
      });
    }
  }

  LoadDataError() {
    return this.toast.error({
      detail: 'Hubo un problema :(',
      summary: `Hubo un error al cargar los clientes.`,
    });
  }

  //Modal Functions
  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
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
