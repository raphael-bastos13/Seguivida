import { Component, AfterViewInit } from '@angular/core'; // Importa AfterViewInit
import { Router } from '@angular/router'; // Importa o Router
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage implements AfterViewInit {
  // Implementa AfterViewInit
  isModalOpen = false;

  constructor(private router: Router) {} // Injeta o Router no construtor

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // Lifecycle hook chamado após a inicialização da view
  ngAfterViewInit() {
    const card = document.querySelector('.card') as HTMLElement; // Obtém o elemento da página
    if (card) {
      VanillaTilt.init(card, {
        max: 25, // Ângulo máximo do efeito
        speed: 400, // Velocidade do movimento
      });
    }
  }
}
