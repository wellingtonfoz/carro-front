import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../auth/login.service';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Usuario } from '../../../auth/usuario';
import { AlterarSenhaComponent } from '../../usuario/alterar-senha/alterar-senha.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule, MdbModalModule, AlterarSenhaComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  loginService = inject(LoginService);

  @ViewChild('modalAltera') modalAltera!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois

  modalAlterarSenha() {
    this.modalRef = this.modalService.open(this.modalAltera);
  }

  meuEventoTratamento(usuario: any) {
    this.modalRef.close();
  }
}
