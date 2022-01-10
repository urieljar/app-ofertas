import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/Proyecto';
import { Observable } from 'rxjs';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  header = new HttpHeaders().set('Contet-Type', 'application/json');
  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }
  getProyectos(){
    return this.http.get<any[]>(`${URL}/proyecto`);
  }
  getProyecto(id: number){
    return this.http.get<any[]>(`${URL}/proyecto/${id}`,{headers:this.header});
  }
  postProyecto(proyecto: Proyecto) {
    return this.http.post<any>(`${URL}/proyecto`, proyecto, { headers: this.header });
  }
  putProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${URL}/proyecto/${proyecto.id}`, proyecto, { headers: this.header});
  }
  deleteProyecto(id: number) {
    return this.http.delete<any[]>(`${URL}/proyecto/${id}`, { headers: this.header });
  }
}
