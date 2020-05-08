import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.models';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url)
            .pipe(map( (resp: any) => {

              this.totalHospitales = resp.total;
              return resp.hospital;
            }));
  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
            .pipe(map((resp: any) => {
              Swal.fire({
                title: 'Borrar Hospital',
                text: 'El hospital ha sido borrado correctamente',
                icon: 'success'
              });

              return true;
            }));
  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre })
              .pipe(map( resp  => {

                Swal.fire({
                  title: 'Hospital creado',
                  text: 'El hospital ha sido creado correctamente',
                  icon: 'success'
                });

                return true;
              }));
  }

  buscarHospitales( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
            .pipe(map((resp: any) => {
              Swal.fire({
                title: 'Hospital actualizado',
                text: hospital.nombre,
                icon: 'success'
              });

              return true;
    }));
  }
}
