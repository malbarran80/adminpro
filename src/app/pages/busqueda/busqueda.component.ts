import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { Hospital } from 'src/app/models/hospital.models';
import { Usuario } from '../../models/usuario.models';
import { Medico } from '../../models/medicos.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient) {

    activatedRoute.params
          .subscribe(params => {

            let termino = params.termino;
            this.buscar(termino);
          });
  }

  ngOnInit() {
  }

  buscar(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/' + termino;

    this.http.get(url)
          .subscribe( (resp: any) => {

            console.log(resp);

            this.usuarios = resp.usuarios;
            this.hospitales = resp.hospitales;
            this.medicos = resp.medicos;
          });
  }
}
