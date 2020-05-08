import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';

import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(public _usuarioService: UsuarioService,
              public _router: Router) { }

  errorSonIguales( campo1: string, campo2: string ) {

      return (group: FormGroup) => {

        let password1 = group.controls[campo1].value;
        let password2 = group.controls[campo2].value;

        if (password1 === password2) {
          return null;
        }

        return {
          errorSonIguales: true
        };
      };
  }

  ngOnInit() {
    init_plugins();

    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required ),
      correo: new FormControl(null, [Validators.required, Validators.email] ),
      password: new FormControl(null, Validators.required ),
      password2: new FormControl(null, Validators.required ),
      condiciones: new FormControl( false ),
    }, { validators: this.errorSonIguales( 'password', 'password2') });

    this.formulario.setValue({
      nombre: 'Test ',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {

    if (this.formulario.invalid) {
      return;
    }

    if ( !this.formulario.value.condiciones ) {
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar las condiciones',
        icon: 'warning'});

      return;
    }

    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe( resp => this._router.navigate(['/login']));
  }
}
