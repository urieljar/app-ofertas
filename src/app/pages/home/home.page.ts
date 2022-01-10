import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Componente } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 // componentes: Componente[]=[];
 componentes: Observable<Componente[]>;
  constructor(
    private dataService: DataService,
    private menuCtrl: MenuController,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.componentes= this.dataService.getMenuOpts();
  }
  mostrarMenu() {
    this.menuCtrl.open('menu-content');
  }
  logout() {
    this.usuarioService.logout();
  }
}
