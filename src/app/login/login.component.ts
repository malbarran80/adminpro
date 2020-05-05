import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.models';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '759496447631-4l33mhp9nto39gsfhm0r2d21s7d4h7md.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });
  }

  attachSignin( elemento ) {

    this.auth2.attachClickHandler( elemento, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
            .subscribe( () => window.location.href = '#/dashboard');
    });
  }

  ingresar(formulario: NgForm) {

    if (formulario.invalid) {
      return;
    }

    let usuario = new Usuario(null, formulario.value.correo, formulario.value.password);

    this._usuarioService.login(usuario, formulario.value.recuerdame)
        .subscribe( resp => {
          if (resp) {
            this.router.navigate(['/dashboard']);
          }
        });
  }
}
