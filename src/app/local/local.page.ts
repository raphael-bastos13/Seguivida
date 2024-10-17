import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa o Router

@Component({
  selector: 'app-local',
  templateUrl: './local.page.html',
  styleUrls: ['./local.page.scss'],
})
export class LocalPage {
  isModalOpen = false;

  constructor(private router: Router) {} // Injeta o Router no construtor

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
