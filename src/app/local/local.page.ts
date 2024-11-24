import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-local',
  templateUrl: './local.page.html',
  styleUrls: ['./local.page.scss'],
})
export class LocalPage implements OnInit {
  isModalOpen = false; // Gerencia o estado do modal
  map: any; // Objeto do mapa
  service: any; // Serviço de lugares
  markers: any[] = []; // Array para armazenar os marcadores

  constructor(private router: Router) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.loadMap(); // Carrega o mapa quando a página inicializa
  }

  async loadMap() {
    try {
      // Obtém a localização atual do usuário
      const position = await Geolocation.getCurrentPosition();

      // Carrega o Google Maps API com sua chave diretamente
      const loader = new Loader({
        apiKey: 'AIzaSyBF7Yw_2p3Nnth3XyS5g_I_2p5BWXXNblM', // Insira sua chave diretamente
        version: 'weekly',
      });

      loader
        .load()
        .then(() => {
          const google = (window as any).google;

          // Configurações do mapa
          const mapOptions = {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            zoom: 15,
          };

          // Inicializa o mapa
          this.map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            mapOptions
          );

          // Carrega hospitais próximos
          this.loadNearbyHospitals();
        })
        .catch((error) => {
          alert('Erro ao carregar o Google Maps. Tente novamente.');
          console.error('Erro ao carregar Google Maps:', error);
        });
    } catch (error) {
      alert('Não foi possível obter sua localização. Verifique as permissões.');
      console.log('Erro ao obter localização:', error);
    }
  }

  loadNearbyHospitals() {
    // Remove todos os marcadores existentes antes de adicionar novos
    this.clearMarkers();

    // Configura o serviço de busca de lugares
    this.service = new google.maps.places.PlacesService(this.map);

    const request = {
      location: this.map.getCenter(), // Ponto central do mapa
      rankBy: google.maps.places.RankBy.DISTANCE, // Sem limite de distância
      type: 'hospital', // Apenas hospitais
    };

    // Realiza a busca por hospitais
    this.service.nearbySearch(request, (results: any[], status: string) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((place) => {
          // Adiciona um marcador para cada hospital encontrado
          const marker = new google.maps.Marker({
            position: place.geometry.location, // Localização do hospital
            map: this.map, // Adiciona ao mapa principal
            title: place.name, // Nome do hospital como título do marcador
          });

          // Armazena o marcador no array para futura manipulação
          this.markers.push(marker);

          // Opcional: Exibe informações do hospital no console (para depuração)
          console.log('Hospital encontrado:', place.name);
        });
      } else {
        alert('Erro ao carregar hospitais. Tente novamente.');
        console.error('Erro na busca de hospitais:', status);
      }
    });
  }

  // Método para limpar todos os marcadores existentes no mapa
  clearMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null); // Remove o marcador do mapa
    });
    this.markers = []; // Limpa o array de marcadores
  }
}
