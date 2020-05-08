import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.models';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  cargando: boolean = true;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.cargarHospitales();

    // Me suscribo al EventEmitter de modalUploadService para recargar las imagenes cuando lanza un evento.
    this._modalUploadService.notificacion
          .subscribe(resp => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde)
            .subscribe( (hospitales: any) => {
              this.hospitales = hospitales;
              this.cargando = false;
            });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if (desde >= this._hospitalService.totalHospitales) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;

    this.cargarHospitales();
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales(termino)
            .subscribe( (resp: any) => {

              console.log(resp.hospitales);
              this.hospitales = resp.hospitales;

              this.cargando = false;
            });
  }

  crearHospital() {

    Swal.fire({
      title: 'Crear Hospital',
      text: 'Introduzca el nombre del hospital',
      input: 'text',
      icon: 'info'
    })
    .then((result) => {

      if (!result.value || result.value.length === 0) {
        return;
      }
      // Lo creo
      this._hospitalService.crearHospital(result.value)
        .subscribe( () => this.cargarHospitales());
    });
  }

  borrarHospital(hospital: Hospital) {

    Swal.fire({
      title: '¿Está seguro',
      text: 'Esta a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    })
    .then( (result: any) => {

      if (result.dismiss !== 'cancel') {

        this._hospitalService.borrarHospital(hospital._id)
            .subscribe( (borrado: boolean) => {

              // Si estoy en una pagina con un unico registro le decremento en 5 para que no salga la tabla vacia.
              if (this.desde % 5 === 0) {
                this.cambiarDesde(-5);
              }

              this.cargarHospitales();
            });
      }
    });
  }

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
              .subscribe();
  }
}
