import { Component, OnInit} from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit{
 /* loginUser: FormGroup = this.fb.group({
    email: ['uriel@gmail.com', [ Validators.required, Validators.email ]],
    password: ['admin2020', [ Validators.required ]]
  });*/
  loginUser = {
    email: 'uriel@gmail.com',
    password: 'admin2020'
  };

    constructor(
     private menu: MenuController,
     private usuarioService: UsuarioService,
     private navCtrl: NavController,
     private uiService: UiService,
     ) {this.menu.enable(false); }
     ngOnInit(): void {
    }
  enviar(){
    this.menu.enable(true);
  }
  async login( fLogin: NgForm ){
   // const { email, password } = this.loginUser.value;
   /*this.navCtrl.navigateRoot('/home');
   this.menu.enable(true);*/
    if( fLogin.invalid) {return;}
    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password);
    if(valido){
      //navegar al home
      this.navCtrl.navigateRoot('/home');
      this.menu.enable(true);
    }else{
      //mostrar alerta de usuarios y contraseña no correctos
      this.uiService.alertaInformativa('usuario y contraseña no son correctos');
    }
  }
}
