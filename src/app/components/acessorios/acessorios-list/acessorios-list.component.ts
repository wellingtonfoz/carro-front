import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Page } from '../../../models/page';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-acessorios-list',
  standalone: true,
  imports: [FormsModule, NgbPaginationModule],
  templateUrl: './acessorios-list.component.html',
  styleUrl: './acessorios-list.component.scss',
})
export class AcessoriosListComponent {

  lista: Acessorio[] = [];
  pagina: Page = new Page();
  numPage: number = 1;
  qtidPorPagina: number = 5;


  pesquisa: string = "";

  @Input("modoModal") modoModal: boolean = false;
  @Output("meuEvento") meuEvento = new EventEmitter();

  acessorioService = inject(AcessorioService);

  constructor() {
    this.findAll();
  }


  findAll(){
   
    this.acessorioService.findAll(this.numPage, this.qtidPorPagina).subscribe({
      next: (page) => {
        this.lista = page.content;
        this.pagina = page;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  
  }

  delete(acessorio: Acessorio){

    Swal.fire({
      title: 'Deseja mesmo deleatr?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.acessorioService.deleteById(acessorio.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });

      }
    });

  }


  findByNome(){

    this.acessorioService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');;
      }
    })

  }

  selecionar(acessorio: Acessorio){
    this.meuEvento.emit(acessorio);
  }

  trocarPagina(pageClicada: any){
    this.numPage = pageClicada;
    this.findAll();
  }

}
