import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string | null;

constructor(private authService: AngularFireAuth,
            private router: Router) { }

  login(correo:string, contrasena: string){
    return new Promise((resolve,reject) => {
      this.authService.signInWithEmailAndPassword(correo,contrasena).then(
        datos => resolve(datos), 
        error => reject(error)
      )
    })
  }


  getAuth(){
    return this.authService.authState.pipe(
      map(auth => auth)
    )
  }

  LogOut() {
    this.authService.signOut()
  }

}
