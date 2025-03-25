import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarrosListComponent } from './components/carros/carros-list/carros-list.component';
import { CarrosFormComponent } from './components/carros/carros-form/carros-form.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children:[
        {path: "carros", component: CarrosListComponent},
        {path: "carros/new", component: CarrosFormComponent},
        {path: "carros/edit/:id", component: CarrosFormComponent}
    ]}
];
