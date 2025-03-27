import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/api/marca';

  constructor() { }


  findAll(): Observable<Marca[]>{
    return this.http.get<Marca[]>(this.API+'/findAll');
  }

  findByNome(nome: string): Observable<Marca[]>{
    let par = new HttpParams()
    .set('nome',nome);
    
    return this.http.get<Marca[]>(this.API+'/findByNome', {params: par});
  }

  findById(id: number): Observable<Marca>{
    return this.http.get<Marca>(this.API+'/findById/'+id);
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'});
  }

  save(marca: Marca): Observable<string> {
    return this.http.post<string>(this.API+'/save', marca, {responseType: 'text' as 'json'});
  }

  update(marca: Marca, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, marca, {responseType: 'text' as 'json'});
  }


}
