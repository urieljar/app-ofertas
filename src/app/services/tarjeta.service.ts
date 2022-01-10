import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarjeta } from '../models/Tarjeta';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  header = new HttpHeaders().set('Contet-Type', 'application/json');
  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }
  getTarjetas(){
    return this.http.get<any[]>(`${URL}/tarjeta`);
  }
  getTarjeta(id: number){
    return this.http.get<any[]>(`${URL}/tarjeta/${id}`,{headers:this.header});
  }
  postTarjeta(tarjeta: Tarjeta) {
    return this.http.post<any>(`${URL}/tarjeta`, tarjeta, { headers: this.header });
  }
  putTarjeta(tarjeta: Tarjeta): Observable<Tarjeta> {
    return this.http.put<Tarjeta>(`${URL}/tarjeta/${tarjeta.id}`, tarjeta, { headers: this.header});
  }
  deleteTarjeta(id: number) {
    return this.http.delete<any[]>(`${URL}/tarjeta/${id}`, { headers: this.header });
  }
}
