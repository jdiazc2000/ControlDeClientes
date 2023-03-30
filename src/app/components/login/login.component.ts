import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/models/Configuracion.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UntilDestroy,untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  correo: string = "%user@hotmail.com%"
  contrasena: string = "%123456%"
  PermitirRegistro: boolean | undefined = false

  constructor(private router: Router,
              private toaster: ToasterService,
              private loginService: LoginService,
              private configuracionService: ConfiguracionService){}

  ngOnInit(): void {
    this.configuracionService.getConfiguracion().pipe(untilDestroyed(this)).subscribe((config: Configuracion) => {
      this.PermitirRegistro = config.PermitirRegistro;
    })
  }

  submitData(correo: string, contrasena: string){
    this.loginService.login(correo,contrasena).then(res => {
      this.router.navigate(['/clientes']);
    })
    .catch(error => {
      console.log(error)
      this.toaster.ActiveToaster("error","Credenciales incorrectas","Por favor ingresar credenciales correctas.")
    })
  }
}
