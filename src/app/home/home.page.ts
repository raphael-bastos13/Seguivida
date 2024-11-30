import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  buscarHospitais() {
    // URL do Google Maps com busca por hospitais próximos
    const url = 'https://www.google.com/maps/search/hospitais';
    // Abrir o link em uma nova aba ou janela
    window.open(url, '_blank');
  }
}
