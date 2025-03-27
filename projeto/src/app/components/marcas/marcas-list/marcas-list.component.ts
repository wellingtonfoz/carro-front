import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcas-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './marcas-list.component.html',
  styleUrl: './marcas-list.component.scss',
})
export class MarcasListComponent {

  lista: Marca[] = [];
  pesquisa: string = "";

  @Input("modoModal") modoModal: boolean = false;
  @Output("meuEvento") meuEvento = new EventEmitter();

  marcaService = inject(MarcaService);

  constructor() {
    this.findAll();
  }


  findAll(){
   
    this.marcaService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  
  }

  delete(marca: Marca){

    Swal.fire({
      title: 'Deseja mesmo deleatr?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.marcaService.deleteById(marca.id).subscribe({
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

    this.marcaService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');;
      }
    })

  }


  selecionar(marca: Marca){
    this.meuEvento.emit(marca); //esse disparo vai acionar o método do FORM
  }


}
