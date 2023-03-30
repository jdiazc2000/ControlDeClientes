import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { Configuracion } from '../..//models/Configuracion.model';
import { UntilDestroy,untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit{
  PermitirRegistro: boolean | undefined = false 

  constructor(private configuracionService: ConfiguracionService,
              private router: Router){}


  ngOnInit(): void {
    this.configuracionService.getConfiguracion().pipe(untilDestroyed(this)).subscribe((config: Configuracion) => {
      this.PermitirRegistro = config.PermitirRegistro;
    })
  }

  GuardarCambios(){
    let configuracion = {PermitirRegistro: this.PermitirRegistro};
    this.configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/clientes'])
  }
}
