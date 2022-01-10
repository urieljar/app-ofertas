/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Tarjeta } from 'src/app/models/Tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  id: any;
  titulo= '';
  tarjeta: Tarjeta = new Tarjeta();
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private tarjetaService: TarjetaService,
    private r: Router) { }
    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      if (this.id == -1) {
        this.titulo = 'Nuevo Cliente';
      } else {
        this.titulo = 'Editar Cliente';
        this.tarjetaService.getTarjeta(this.id).subscribe(
          res => {
          this.tarjeta = res['data'];
          console.log('tarjeta', this.tarjeta);
        });
      }
    }
  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async alerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert =await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['Ok']
    });
    await alert.present();
  }
  agregar(){
}
  /*
  guardar() {
    console.log(this.balacentInput.value);
  }*/
  eliminar() { }
  guardar(){
    let peticion: Observable<any>;
    if (this.tarjeta.id) {
      peticion = this.tarjetaService.putTarjeta(this.tarjeta);
    } else {
      peticion = this.tarjetaService.postTarjeta(this.tarjeta);
    }
    peticion.subscribe(
      res => {
      if (this.tarjeta.id) {
        this.alerta('Modificacion', this.tarjeta.categoria, 'Modificación exitosa!');
      } else {
        this.alerta('Alta a Usuario', this.tarjeta.categoria, 'Alta exitosa!');
      }
      this.r.navigate(['/tarjeta']);
    });
  }
}
