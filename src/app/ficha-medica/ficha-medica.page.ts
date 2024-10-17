import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa o Router

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage {
  isModalOpen = false;

  constructor(private router: Router) {} // Injeta o Router no construtor

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
