import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";
import {Injectable} from '@angular/core'
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs";
import { ToasterService } from "../services/toaster.service";

@Injectable()
export class AuthGuardian{

    constructor(private router: Router, 
                private AngularFireAuth: AngularFireAuth,
                private toasterService: ToasterService,
                private loginService: LoginService){}

    canActivate() {
        return this.AngularFireAuth.authState.pipe(
            map(auth => {
                if(!auth){
                    this.router.navigate(['/login']);
                    this.loginService.LogOut()
                    this.toasterService.ActiveToaster('error','Se te regreso a la página de inicio de sesión','Por favor inicie sesion para ingresar.')
                    return false
                }else{

                    if(this.loginService.NewLogin){
                        this.toasterService.ActiveToaster('success','Sesión iniciada correctamente','Bienvenido a la plataforma de control de clientes :).')
                        this.loginService.NewLogin = false
                    }

                    return true
                }
            })
        )
    }
}