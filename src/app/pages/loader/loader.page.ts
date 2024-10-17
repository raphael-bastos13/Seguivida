import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
  //FAZ ELE IR PARA A PAGINA HOME DEPOIS DE UM CERTO TEMPO
  constructor(public router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl('welcome');
    }, 2010);
  }
  ngOnInit() {}
}
