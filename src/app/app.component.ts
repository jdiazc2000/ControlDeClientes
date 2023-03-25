import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ControlDeClientes';

  constructor(private toast: NgToastService){}


  Enviar1() {
    this.toast.success({detail:"Success Message", summary:this.title})
  }

  Enviar2() {
    this.toast.error({detail:"Success Message", summary:"Mensaje enviado!"})
  }

  Enviar3() {
    this.toast.info({detail:"Success Message", summary:"Mensaje enviado!"})
  }

  Enviar4() {
    this.toast.warning({detail:"Success Message", summary:"Mensaje enviado!"})
  }

}
