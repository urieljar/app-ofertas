import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiService } from 'src/app/services/ui.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerUser: Usuario = {
    name: 'Nose',
    email: 'correo@correo.com',
    password: '12345678',
  };
  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private uiService: UiService,
    private usuarioService: UsuarioService,) {
      this.menu.enable(false);
     }

  ngOnInit() {
  }
  async registro( fRegistro: NgForm ) {

    if ( fRegistro.invalid ) { return; }

    const valido = await this.usuarioService.registro( this.registerUser );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/home');
      this.menu.enable(true);
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Datos incorrectos la contraseña debe ser minimo de 8 caracters o el correo ya existe.');
    }
  }
}
