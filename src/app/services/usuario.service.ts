/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  headers = new HttpHeaders();
// header = new HttpHeaders().set('Contet-Type', 'application/json');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string=null;
  private usuario: Usuario = {};
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController) {
   /*   this.headers.append("Accept", "application/json");
      this.headers.append("Authorization", "Bearer " + this.access_token);*/
    }

  login(email: string, password: string): Promise<any>{
    const data = { email, password };

    return new Promise( resolve => {

      this.http.post(`${ URL }/login`, data)
      .subscribe( async res => {
          console.log(res);
          if( res['ok']){
            await this.guardarToken(res['access_token']);
            resolve(true);
          }
        }, err => {
          console.log('error');
          this.access_token=null;
          this.storage.clear();
          resolve(false);
        });
    });
  }

  logout() {

  // adding Authorization token in your headers
  const headers = new HttpHeaders({
    // eslint-disable-next-line quote-props
    'Authorization': 'Bearer ' + this.access_token
  });

  /*const headers = new Headers();
   headers.append('Authorization:', 'Bearer ' + this.access_token);
   headers = new HttpHeaders({
      'x-token': this.access_token
    });*/
    //const headers = new HttpHeaders('Authorization', `Bearer ${this.access_token}`).set('Contet-Type', 'application/json');
    this.usuario = null;
    console.log(this.access_token);
    this.http.post(`${ URL }/logout/`, {headers});
    console.log(headers);
    this.access_token = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/inicio');
  }
  registro( usuario: Usuario ) {

    return new Promise( resolve => {

      this.http.post(`${ URL }/register`, usuario )
          .subscribe( async resp => {
            console.log(resp);
            if ( resp['ok'] ) {
            //  await this.guardarToken( resp['access_token'] );
              resolve(true);
            } else {
              this.access_token = null;
              this.storage.clear();
              resolve(false);
            }
          },err => {
            console.log(err.error.errors);
            resolve(false);
          });
    });

  }
   // eslint-disable-next-line @typescript-eslint/naming-convention
   async guardarToken(access_token: string){
    this.access_token = access_token;
    await this.storage.set('access_token',access_token);
  }
  async cargarToken() {

    this.access_token = await this.storage.get('access_token') || null;

  }
  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.access_token) {
      this.navCtrl.navigateRoot('/inicio');
      return Promise.resolve(false);
    }

    return new Promise( resolve => {
      const headers = new HttpHeaders({
        // eslint-disable-next-line quote-props
        'Authorization': 'Bearer ' + this.access_token
      });

      this.http.get(`${ URL }/infouser/`, { headers })
        .subscribe( resp => {

          if ( resp['ok'] ) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/inicio');
            resolve(false);
          }
        });
    });

  }

}
