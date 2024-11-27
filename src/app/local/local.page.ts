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
  map!: google.maps.Map; // Objeto do mapa
  service!: google.maps.places.PlacesService; // Serviço de lugares
  markers: google.maps.Marker[] = []; // Array para armazenar os marcadores

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

      // Carrega o Google Maps API com sua chave (considere usar variáveis de ambiente)
      const loader = new Loader({
        apiKey: 'AIzaSyBF7Yw_2p3Nnth3XyS5g_I_2p5BWXXNblM',
        version: 'weekly',
      });

      loader
        .load()
        .then(() => {
          const google = (window as any).google;

          // Configurações do mapa
          const mapOptions: google.maps.MapOptions = {
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

    const request: google.maps.places.PlaceSearchRequest = {
      location: this.map.getCenter(), // Ponto central do mapa
      rankBy: google.maps.places.RankBy.DISTANCE, // Sem limite de distância
      type: 'hospital', // Apenas hospitais
    };

    // Realiza a busca por hospitais
    this.service.nearbySearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            if (place.geometry && place.geometry.location) {
              // Adiciona um marcador para cada hospital encontrado
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map: this.map,
                title: place.name,
                icon: {
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Ícone vermelho
                },
              });

              // Armazena o marcador no array para futura manipulação
              this.markers.push(marker);

              // Opcional: Exibe informações do hospital no console (para depuração)
              console.log('Hospital encontrado:', place.name);
            }
          });

          // Se necessário, paginar resultados
          if (pagination && pagination.hasNextPage) {
            console.log(
              'Mais resultados disponíveis. Você pode chamar pagination.nextPage() se necessário.'
            );
            // Exemplo: pagination.nextPage();
          }
        } else {
          alert('Nenhum hospital encontrado nesta área.');
          console.error('Erro na busca de hospitais:', status);
        }
      }
    );
  }

  // Método para limpar todos os marcadores existentes no mapa
  clearMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null); // Remove o marcador do mapa
    });
    this.markers = []; // Limpa o array de marcadores
  }
}
