import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  correo: string 
  contrasena: string 

  constructor(private router: Router,
    private toaster: ToasterService,
    private loginService: LoginService){}

  RegistrarUser(correo:string,contrasena:string){
    this.loginService.Register(correo,contrasena).then(res => {
      this.router.navigate(['/clientes']);
      this.toaster.ActiveToaster("success","Registro éxitoso", "Usuario registrado de manera éxitosa.")
    })
    .catch(error => {
      console.log(error)
      this.toaster.ActiveToaster("error","ERROR",error)
    })
  }
}
