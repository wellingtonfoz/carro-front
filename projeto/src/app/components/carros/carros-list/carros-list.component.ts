import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { CarroService } from '../../../services/carro.service';
import { FormsModule } from '@angular/forms';
import { CarrosFormComponent } from '../carros-form/carros-form.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

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
        Swal.fire(erro.error, '', 'error');
      }
    });
  
  }

  delete(carro: Carro){

    Swal.fire({
      title: 'Deseja mesmo deleatr?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.carroService.deleteById(carro.id).subscribe({
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

    this.carroService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');;
      }
    })

  }

  new(){ //ABRIRRRRRRRRRRRRRRRRRR
    this.carroEdit = new Carro(); //limpando o carroEdit para um novo cadastro
    this.modalRef = this.modalService.open(this.modalCarroForm, { modalClass: 'modal-xl'});
  }

  edit(carro: Carro){
    this.carroEdit = carro; //carregando o carroEdit com o carro clicado na tabela
    this.modalRef = this.modalService.open(this.modalCarroForm, { modalClass: 'modal-xl'});
  }

  meuEventoTratamento(mensagem:any){
    this.findAll();
    this.modalRef.close();
  }

}
