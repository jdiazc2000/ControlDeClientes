import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Configuracion } from '../models/Configuracion.model';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion | any>

  //Id unico de la coleccion de configuracion
  id:number = 1;

constructor(private database: AngularFirestore) { }

getConfiguracion(): Observable<Configuracion>{
  this.configuracionDoc = this.database.doc<Configuracion>(`Configuracion/${this.id}`);
  this.configuracion = this.configuracionDoc.valueChanges()
  return this.configuracion
}

modificarConfiguracion(Configuracion: Configuracion){
  this.configuracionDoc = this.database.doc<Configuracion>(`Configuracion/${this.id}`);
  this.configuracionDoc.update(Configuracion)
}

}
