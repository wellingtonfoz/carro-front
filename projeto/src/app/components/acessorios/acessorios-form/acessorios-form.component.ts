import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Acessorio } from '../../../models/acessorio';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessorioService } from '../../../services/acessorio.service';

@Component({
  selector: 'app-acessorios-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessorios-form.component.html',
  styleUrl: './acessorios-form.component.scss'
})
export class AcessoriosFormComponent {

  acessorio: Acessorio = new Acessorio();

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  acessorioService = inject(AcessorioService);

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }
  }

  findById(id: number){

    this.acessorioService.findById(id).subscribe({
      next: (acessorioRetornado) => {
        this.acessorio = acessorioRetornado;
      },
      error: (erro) => {
        alert(erro.error)
      }
    });

  }

  save(){
    if(this.acessorio.id > 0){
      // UPDATE
      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/acessorios']);
        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    }else{
      // SAVE
      this.acessorioService.save(this.acessorio).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/acessorios']);
        },
        error: (erro) => {
          alert(erro.error)
        }
      });


    }
  }

}
