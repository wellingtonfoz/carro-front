import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.scss',
})
export class UsuariosListComponent {

  lista: Usuario[] = [];
  pesquisa: string = "";

  @Input("modoModal") modoModal: boolean = false;
  @Output("meuEvento") meuEvento = new EventEmitter();

  usuarioService = inject(UsuarioService);
  loginService = inject(LoginService);

  constructor() {
    this.findAll();
  }


  findAll(){
   
    this.usuarioService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  
  }

  delete(usuario: Usuario){

    Swal.fire({
      title: 'Deseja mesmo deleatr?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.deleteById(usuario.id).subscribe({
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

    this.usuarioService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');;
      }
    })

  }


  selecionar(usuario: Usuario){
    this.meuEvento.emit(usuario); //esse disparo vai acionar o método do FORM
  }


}
