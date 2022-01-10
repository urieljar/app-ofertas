import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Componente } from '../interfaces/interfaces';
 const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getMenuOpts(){
    return this.http.get<Componente[]>('/assets/data/menu-opts.json');
  }
  getPosts(){
    return this.http.get(`${ URL }/login`);
  }
}
