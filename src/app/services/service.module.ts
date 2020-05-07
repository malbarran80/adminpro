import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService
} from './service.index';

import { LoginGuardGuard } from './guards/login-guard.guard';

import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    ModalUploadService
  ]
})
export class ServiceModule { }
