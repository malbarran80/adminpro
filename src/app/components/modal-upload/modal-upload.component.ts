import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModalUploadService) {
    console.log('Modal listo');
   }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {

      Swal.fire({
        title: 'Solo imagenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });

      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {

    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
            .then(resp => {

              console.log(resp);
              this._modalUploadService.notificacion.emit(resp);
              this.cerrarModal();
            })
            .catch( err => {
              console.log('Error en la carga...');
            });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }
}
