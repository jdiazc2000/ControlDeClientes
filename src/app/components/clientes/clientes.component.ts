import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes!: Cliente[];
  clienteslength: number = 0;
  LoadingMessage: string = 'Cargando..';
  PageReady: boolean = true;
  closeResult = '';
  LoadDataSignal = true

  @ViewChild('clienteForm', { static: false }) clientForm: NgForm;

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    correo: '',
    saldo: 0,
  };

  constructor(
    private clientesService: ClienteService,
    private modalService: NgbModal,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.clientesService.getClientes().subscribe(
      (clientesData) => {
        if (clientesData !== undefined) {
          this.clientes = clientesData;
          this.clienteslength = clientesData.length;
          this.LoadingMessage = 'No se encontraron datos';
        }
        
        if(this.LoadDataSignal !== false){
          if (this.clientes !== undefined) {
            this.toasterService.ActiveToaster("success","Carga exitosa","Datos cargados con éxito.")
          } else {
            this.toasterService.ActiveToaster("error","Error","Error al cargar los datos")
          }
        }

        return this.PageReady = false;
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

  AgregarCliente({ value, valid }: { value: Cliente; valid: boolean | null }) {
    if (!valid) {
      this.toasterService.ActiveToaster("error","Error al agregar el cliente","Llenar el formulario correctamente.")
    } else {
      this.LoadDataSignal = false
      this.clientesService.agregarCliente(value);
      this.modalService.dismissAll(this.modalService);

      setTimeout(() => {
        this.cliente.nombre = '';
        this.cliente.apellido = '';
        this.cliente.correo = '';
        this.cliente.saldo = 0;
      }, 1000);

      return this.toasterService.ActiveToaster("success","Cliente agregado","El cliente fue agregado de manera éxitosa.")
    }
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
