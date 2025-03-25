import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carros-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carros-form.component.html',
  styleUrl: './carros-form.component.scss'
})
export class CarrosFormComponent {

  carro: Carro = new Carro();

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  carroService = inject(CarroService);

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }
  }

  findById(id: number){

    this.carroService.findById(id).subscribe({
      next: (carroRetornado) => {
        this.carro = carroRetornado;
      },
      error: (erro) => {
        alert('Deu erro!');
      }
    });

  }

  save(){
    if(this.carro.id > 0){
      // UPDATE
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/carros']);
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });


    }else{
      // SAVE
      this.carroService.save(this.carro).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/carros']);
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });


    }
  }

}
