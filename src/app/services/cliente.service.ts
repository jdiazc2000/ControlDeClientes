import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientesCollection: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;

  clientesObject: Observable<Cliente[]>
  cliente: Observable<Cliente>

  constructor(private database: AngularFirestore){
    //Clientes es el nombre de la tabla en Firebase
    this.clientesCollection = database.collection('Clientes', ref => ref.orderBy('nombre','desc'));
  }

  getClientes(): Observable<Cliente[]>{
    //Obtener los clientes
    //PIPE Itera entre cada uno de los elementos
    this.clientesObject = this.clientesCollection.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    )
    return this.clientesObject
  }

  agregarCliente(cliente: Cliente) {
    this.clientesCollection.add(cliente)
  }

  getObjetoCLiente(){
    let a = this.clientesObject;
    return a
  }

}