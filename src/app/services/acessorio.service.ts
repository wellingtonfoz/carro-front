import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acessorio } from '../models/acessorio';
import { environment } from '../../environments/environment';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+'/api/acessorio';

  constructor() { }


  findAll(numPage: number, qtidPorPagina: number): Observable<Page>{
    return this.http.get<Page>(this.API+'/findAll/'+numPage+'/'+qtidPorPagina);
  }

  findByNome(nome: string): Observable<Acessorio[]>{
    let par = new HttpParams()
    .set('nome',nome);
    
    return this.http.get<Acessorio[]>(this.API+'/findByNome', {params: par});
  }

  findById(id: number): Observable<Acessorio>{
    return this.http.get<Acessorio>(this.API+'/findById/'+id);
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'});
  }

  save(acessorio: Acessorio): Observable<string> {
    return this.http.post<string>(this.API+'/save', acessorio, {responseType: 'text' as 'json'});
  }

  update(acessorio: Acessorio, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, acessorio, {responseType: 'text' as 'json'});
  }


}
