import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo: string = "%user@hotmail.com%"
  contrasena: string = "%123456%"

  constructor(private router: Router,
              private toaster: ToasterService,
              private loginService: LoginService){}

  submitData(){
    this.loginService.login(this.correo,this.contrasena).then(res => {
      this.router.navigate(['/table']);
    })
    .catch(error => {
      this.toaster.ActiveToaster("error","Credenciales incorrectas","Por favor ingresar credenciales correctas.")
    })
  }
}
