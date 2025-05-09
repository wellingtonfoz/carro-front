import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.scss'
})
export class AlterarSenhaComponent {

  senha: string = "";
  senhaNovamente = "";

  modoEdit: boolean = false;

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  usuarioService = inject(UsuarioService);
  loginService = inject(LoginService);

  constructor(){
    
  }


  save(){

    if(this.senha != this.senhaNovamente){
      Swal.fire('As senhas digitadas não conferem!', '', 'error');
      return;
    }

    if(this.senha.length < 6){
      Swal.fire('A senha precisa ter no mínimo 6 caracteres!', '', 'error');
      return;
    }


    this.usuarioService.alterarSenha(this.senha, this.loginService.getUsuarioLogado().id).subscribe({
      next: (mensagem) => {
        Swal.fire(mensagem, '', 'success');
        this.roteador.navigate(['admin/dashboard']);
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

}
