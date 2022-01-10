/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { Tarjeta } from '../../models/Tarjeta';
import { TarjetaInterface } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage {
  tarjetas: Tarjeta [] =[];
  //tarjeta = new Tarjeta();
  /* tarjetas = [
    {
    categoria: 'Seguridad',
    subcategoria: 'Ciberseguridad infromatica'
    },
    {
      categoria: 'Constructora',
      subcategoria: 'Desarrollo de infraestructura metropolitana'
    }
  ];*/
  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private tarjetaService: TarjetaService,
    private modalController: ModalController) { }
    ionViewWillEnter() {
      this.tarjetas=null;
      this.tarjetaService.getTarjetas().subscribe(
        (res: Tarjeta[]) =>{
        //console.log(res);
        this.tarjetas = res;
        console.log(this.tarjetas);
      });
    }
/*
    async presentModal() {
      const modal = await this.modalController.create({
        component: ModalPage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }**/
/*
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.refresh();
  }*/
  editar(tarjeta){
    this.navController.navigateForward(['/tarjeta/modal',tarjeta.id]);
  }
  agregar(){
    this.navController.navigateForward(['/tarjeta/modal',-1]);
  }
  async borrar(tarjeta, i){
    const  nombre = `${tarjeta.nombre} de ${tarjeta.subcategoria}`;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Peligro!',
      message: `¿Seguro que desea borrar la tarjeta de la empresa?<br><strong>${nombre}</strong> `,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.tarjetaService.deleteTarjeta(tarjeta.id).subscribe(
              res => {
                console.log(res);
                this.tarjetas.splice(i,1);
              },
              err=>console.log(err)
            );
          }
        }
      ]
    });
    await alert.present();
}

}
