import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/api/carro';

  constructor() { }


  findAll(): Observable<Carro[]>{
    return this.http.get<Carro[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Carro>{
    return this.http.get<Carro>(this.API+'/findById/'+id);
  }

  findByNome(nome: string): Observable<Carro[]>{
    let par = new HttpParams()
    .set('nome',nome);
    
    return this.http.get<Carro[]>(this.API+'/findByNome', {params: par});
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'});
  }

  save(carro: Carro): Observable<string> {
    return this.http.post<string>(this.API+'/save', carro, {responseType: 'text' as 'json'});
  }

  update(carro: Carro, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, carro, {responseType: 'text' as 'json'});
  }


}
