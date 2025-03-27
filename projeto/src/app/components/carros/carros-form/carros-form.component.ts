import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarroService } from '../../../services/carro.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';
import { MarcasListComponent } from '../../marcas/marcas-list/marcas-list.component';
import Swal from 'sweetalert2';
import { MarcaService } from '../../../services/marca.service';
import { AcessoriosListComponent } from '../../acessorios/acessorios-list/acessorios-list.component';
import { Acessorio } from '../../../models/acessorio';

@Component({
  selector: 'app-carros-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcasListComponent, AcessoriosListComponent],
  templateUrl: './carros-form.component.html',
  styleUrl: './carros-form.component.scss'
})
export class CarrosFormComponent {

  @Input("carro") carro: Carro = new Carro();
  @Output("meuEvento") meuEvento = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

  listaMarcas!: Marca[];

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  carroService = inject(CarroService);
  marcaService = inject(MarcaService);

  @ViewChild("modalMarcasList") modalMarcasList!: TemplateRef<any>; //referência ao template da modal
  @ViewChild("modalAcessoriosList") modalAcessoriosList!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }
    this.findAllMarcas();
  }

  findById(id: number){

    this.carroService.findById(id).subscribe({
      next: (carroRetornado) => {
        this.carro = carroRetornado;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });

  }

  save(){
    if(this.carro.id > 0){
      // UPDATE
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/carros']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });


    }else{
      // SAVE
      this.carroService.save(this.carro).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/carros']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });

    }
  }

  findAllMarcas(){

    this.marcaService.findAll().subscribe({
      next: (lista) => {
        this.listaMarcas = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });

  }

  compareId(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }



  meuEventoTratamento(marca: Marca){
    this.carro.marca = marca;
    this.modalRef.close();
  }

  meuEventoTratamentoAcessorio(acessorio: Acessorio){
    if(this.carro.acessorios == null)
      this.carro.acessorios = [];

    this.carro.acessorios.push(acessorio);
    this.modalRef.close();
  }

  buscarMarca(){
    this.modalRef = this.modalService.open(this.modalMarcasList, {modalClass: 'modal-xl'});
  }

  buscarAcessorios(){
    this.modalRef = this.modalService.open(this.modalAcessoriosList, {modalClass: 'modal-xl'});
  }

  deletarAcessorio(acessorio: Acessorio){
    let indice = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(indice,1);
  }

}
