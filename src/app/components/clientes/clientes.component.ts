import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgToastService } from 'ng-angular-popup';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  clientes!: Cliente[];
  clienteslength: number = 0;
  LoadingMessage: string = 'Cargando..';
  PageReady:boolean = true
  closeResult = '';
  
  @ViewChild('clienteForm', {static: false}) clientForm: NgForm;
  
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    correo: '',
    saldo: 0 
  }

  constructor(
    private clientesService: ClienteService,
    private toast: NgToastService,
    private modalService: NgbModal,
    private router: Router
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

  ngAfterViewInit(): void {
    this.clientForm ? true : false
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

  AgregarCliente({value, valid}: {value: Cliente, valid: boolean | null}){
    if(!valid){   
      return this.toast.error({
        detail: 'Error al agregar el cliente',
        summary: `Llenar el formulario correctamente.`,
      });
    }else{
      this.clientesService.agregarCliente(value);
      this.modalService.dismissAll(this.modalService);

      setTimeout(() => {
        this.cliente.nombre = ''
        this.cliente.apellido = ''
        this.cliente.correo = ''
        this.cliente.saldo = 0
      }, 1000);
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
