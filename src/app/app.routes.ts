import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarrosListComponent } from './components/carros/carros-list/carros-list.component';
import { CarrosFormComponent } from './components/carros/carros-form/carros-form.component';
import { MarcasListComponent } from './components/marcas/marcas-list/marcas-list.component';
import { AcessoriosListComponent } from './components/acessorios/acessorios-list/acessorios-list.component';
import { MarcasFormComponent } from './components/marcas/marcas-form/marcas-form.component';
import { AcessoriosFormComponent } from './components/acessorios/acessorios-form/acessorios-form.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { guardGuard } from './auth/guard.guard';
import { UsuariosListComponent } from './components/usuario/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './components/usuario/usuarios-form/usuarios-form.component';
import { AlterarSenhaComponent } from './components/usuario/alterar-senha/alterar-senha.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "registre-se", component: UsuariosFormComponent},
    {path: "admin", component: PrincipalComponent, canActivate:[guardGuard], children:[
        {path: "dashboard", component: DashboardComponent},
        {path: "carros", component: CarrosListComponent},
        {path: "carros/new", component: CarrosFormComponent},
        {path: "carros/edit/:id", component: CarrosFormComponent},
        {path: "marcas", component: MarcasListComponent},
        {path: "marcas/new", component: MarcasFormComponent},
        {path: "marcas/edit/:id", component: MarcasFormComponent},
        {path: "acessorios", component: AcessoriosListComponent},
        {path: "acessorios/new", component: AcessoriosFormComponent},
        {path: "acessorios/edit/:id", component: AcessoriosFormComponent},
        {path: "usuarios", component: UsuariosListComponent},
        {path: "usuarios/new", component: UsuariosFormComponent},
        {path: "usuarios/edit/:id", component: UsuariosFormComponent},
        {path: "alterar-senha", component: AlterarSenhaComponent},
    ]}
];
