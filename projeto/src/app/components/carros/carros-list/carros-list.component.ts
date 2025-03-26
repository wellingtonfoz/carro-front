import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { CarroService } from '../../../services/carro.service';
import { FormsModule } from '@angular/forms';
import { CarrosFormComponent } from '../carros-form/carros-form.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-carros-list',
  standalone: true,
  imports: [FormsModule, CarrosFormComponent, MdbModalModule],
  templateUrl: './carros-list.component.html',
  styleUrl: './carros-list.component.scss',
})
export class CarrosListComponent {

  lista: Carro[] = [];
  pesquisa: string = "";
  carroEdit!: Carro;

  carroService = inject(CarroService);

  @ViewChild("modalCarroForm") modalCarroForm!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois

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

  findByNome(){

    this.carroService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert(erro.error);
      }
    })

  }

  new(){ //ABRIRRRRRRRRRRRRRRRRRR
    this.carroEdit = new Carro(); //limpando o carroEdit para um novo cadastro
    this.modalRef = this.modalService.open(this.modalCarroForm);
  }

  edit(carro: Carro){
    this.carroEdit = carro; //carregando o carroEdit com o carro clicado na tabela
    this.modalRef = this.modalService.open(this.modalCarroForm);
  }

  meuEventoTratamento(mensagem:any){
    this.findAll();
    this.modalRef.close();
  }

}
