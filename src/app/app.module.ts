import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { provideAuth,getAuth, AuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgbModule, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    ClientesComponent,
    EditarClientesComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgToastModule,
    NgbModule,
    FormsModule,
    FirestoreModule,
    AngularFirestoreModule,
    AuthModule,
    ToastrModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [NgbNav, { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
