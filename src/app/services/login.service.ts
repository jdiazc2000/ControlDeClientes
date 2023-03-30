import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string | null;
  NewLogin: boolean = true

constructor(private authService: AngularFireAuth) { }

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
    this.NewLogin = true
    this.authService.signOut()
  }

  Register(correo:string, contrasena:string){
    return new Promise((resolve,reject) => {
      this.authService.createUserWithEmailAndPassword(correo,contrasena).then(
        datos => resolve(datos), 
        error => reject(error)
      )
    })
  }

}
