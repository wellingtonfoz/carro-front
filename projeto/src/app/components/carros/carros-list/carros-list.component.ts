import { Component, inject } from '@angular/core';
import { Carro } from '../../../models/carro';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carros-list',
  standalone: true,
  imports: [],
  templateUrl: './carros-list.component.html',
  styleUrl: './carros-list.component.scss',
})
export class CarrosListComponent {

  lista: Carro[] = [];

  carroService = inject(CarroService);

  constructor() {
    this.findAll();
  }


  findAll(){
   
    this.carroService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        alert(erro.error)
      }
    });
  
  }

  delete(carro: Carro){
    if(confirm('Deseja deletar isso aí?')){

      this.carroService.deleteById(carro.id).subscribe({
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
