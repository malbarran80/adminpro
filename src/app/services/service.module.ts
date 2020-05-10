import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SharedService,
  UsuarioService,
  SubirArchivoService
} from './service.index';

import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';

import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medicos/medico.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    AdminGuard,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
