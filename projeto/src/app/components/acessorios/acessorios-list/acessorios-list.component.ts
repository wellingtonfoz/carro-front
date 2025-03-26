import { Component, inject } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';

@Component({
  selector: 'app-acessorios-list',
  standalone: true,
  imports: [],
  templateUrl: './acessorios-list.component.html',
  styleUrl: './acessorios-list.component.scss',
})
export class AcessoriosListComponent {

  lista: Acessorio[] = [];

  acessorioService = inject(AcessorioService);

  constructor() {
    this.findAll();
  }


  findAll(){
   
    this.acessorioService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        alert(erro.error)
      }
    });
  
  }

  delete(acessorio: Acessorio){
    if(confirm('Deseja deletar isso aí?')){

      this.acessorioService.deleteById(acessorio.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.findAll();
        },
        error: (erro) => {
          alert(erro.error)
        }
      });

    }
  }


}
