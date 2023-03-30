import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { map } from "rxjs";

@Injectable()
export class RegisterGuardian {
  PermitirRegistro: boolean | undefined;

  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private configuracionService: ConfiguracionService,
  ) {}

  canActivate() {
    return this.configuracionService.getConfiguracion().pipe(
        map(configuracion => {
           if(configuracion.PermitirRegistro){
                return true
           }else{
                this.router.navigate(["/login"])
                this.toasterService.ActiveToaster('error','No esta permitido crear nuevos usuarios','Se desactivo la función de crear nuevos usuarios, solicitar el acceso al administador.')
                return false
           }
        })
    )
}
}
