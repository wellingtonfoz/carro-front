import { Component, inject } from '@angular/core';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marcas-list',
  standalone: true,
  imports: [],
  templateUrl: './marcas-list.component.html',
  styleUrl: './marcas-list.component.scss',
})
export class MarcasListComponent {

  lista: Marca[] = [];

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
        alert(erro.error)
      }
    });
  
  }

  delete(marca: Marca){
    if(confirm('Deseja deletar isso aí?')){

      this.marcaService.deleteById(marca.id).subscribe({
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
