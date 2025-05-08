import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listaGraficos: any = [];


  constructor(){
    this.listaGraficos.push("01");
    this.listaGraficos.push("02");
    this.listaGraficos.push("03");
    this.listaGraficos.push("04");
    this.listaGraficos.push("05");
    this.listaGraficos.push("06");
  }

}
