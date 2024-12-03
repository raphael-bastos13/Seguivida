import { Component, AfterViewInit } from '@angular/core'; // Importa AfterViewInit
import { Router } from '@angular/router'; // Importa o Router
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.page.html',
  styleUrls: ['./ficha-medica.page.scss'],
})
export class FichaMedicaPage implements AfterViewInit {
  modoEdicao = true; // Começa no modo edição
  isModalOpen = false; // Estado para modal

  // Objeto para armazenar as informações da ficha médica
  fichaMedica = {
    tipoSanguineo: '',
    altura: null,
    peso: null,
    sexo: '',
    idade: null,
    alergias: '',
    condicoesPreExistentes: '',
    contatoEmergencia: '',
  };

  constructor(private router: Router) {} // Injeta o Router no construtor

  // Método para salvar os dados e alternar entre os modos de edição e visualização
  alternarModo() {
    if (this.modoEdicao) {
      console.log('Ficha Médica Salva:', this.fichaMedica);
      // Aqui você pode adicionar lógica para enviar os dados para um backend ou salvar localmente
    }
    this.modoEdicao = !this.modoEdicao; // Alterna entre os modos
  }

  // Controla a abertura do modal
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // Lifecycle hook chamado após a inicialização da view
  ngAfterViewInit() {
    const card = document.querySelector('.card') as HTMLElement; // Obtém o elemento do card
    if (card) {
      VanillaTilt.init(card, {
        max: 25, // Ângulo máximo do efeito
        speed: 400, // Velocidade do movimento
      });
    }
  }
}
