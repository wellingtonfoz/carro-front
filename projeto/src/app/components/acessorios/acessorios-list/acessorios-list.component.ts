import { Component, inject } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acessorios-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acessorios-list.component.html',
  styleUrl: './acessorios-list.component.scss',
})
export class AcessoriosListComponent {

  lista: Acessorio[] = [];
  pesquisa: string = "";

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

}
