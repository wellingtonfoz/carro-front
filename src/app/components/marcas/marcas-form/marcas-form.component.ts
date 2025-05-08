import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Marca } from '../../../models/marca';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcas-form.component.html',
  styleUrl: './marcas-form.component.scss'
})
export class MarcasFormComponent {

  marca: Marca = new Marca();

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  marcaService = inject(MarcaService);

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }
  }

  findById(id: number){

    this.marcaService.findById(id).subscribe({
      next: (marcaRetornado) => {
        this.marca = marcaRetornado;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });

  }

  save(){
    if(this.marca.id > 0){
      // UPDATE
      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/marcas']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });


    }else{
      // SAVE
      this.marcaService.save(this.marca).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/marcas']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });


    }
  }

}
