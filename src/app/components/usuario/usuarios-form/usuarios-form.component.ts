import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../auth/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.scss',
})
export class UsuariosFormComponent {
  modoEdit: boolean = false;

  usuario: Usuario = new Usuario();
  senha: string = '';
  senhaNovamente = '';

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  usuarioService = inject(UsuarioService);
  loginService = inject(LoginService);

  constructor() {
    let id = this.rotaAtivida.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.usuarioService.findById(id).subscribe({
      next: (usuarioRetornado) => {
        this.usuario = usuarioRetornado;
        this.modoEdit = true;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      },
    });
  }

  save() {
    if (this.usuario.id > 0) {
      // UPDATE
      this.usuarioService.update(this.usuario, this.usuario.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/usuarios']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        },
      });
    } else {
      if (this.senha != this.senhaNovamente) {
        Swal.fire('As senhas digitadas não conferem!', '', 'error');
        return;
      }

      if (this.senha.length < 6) {
        Swal.fire('A senha precisa ter no mínimo 6 caracteres!', '', 'error');
        return;
      }

      this.usuario.password = this.senha;
      this.usuario.role = 'USER';
      // SAVE
      this.usuarioService.save(this.usuario).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          if (this.loginService.getToken() == null)
            this.roteador.navigate(['login']);
          else  if (this.loginService.getToken() == '')
            this.roteador.navigate(['login']);
          else this.roteador.navigate(['admin/usuarios']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        },
      });
    }
  }
}
