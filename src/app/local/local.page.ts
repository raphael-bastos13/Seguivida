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
  isModalOpen = false;
  map: any;
  service: any;

  constructor(private router: Router) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      // Obter a localização atual do usuário
      const position = await Geolocation.getCurrentPosition();

      const loader = new Loader({
        apiKey: 'AIzaSyBF7Yw_2p3Nnth3XyS5g_I_2p5BWXXNblM',
        version: 'weekly',
      });

      loader.load().then(() => {
        const mapOptions = {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: 15,
        };

        // Inicializar o mapa no elemento com ID "map"
        this.map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          mapOptions
        );

        // Adicionar um marcador na localização atual
        new google.maps.Marker({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          map: this.map,
          title: 'Minha localização atual',
        });

        // Chamar a função para buscar hospitais próximos
        this.loadNearbyHospitals(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    } catch (error) {
      console.log('Erro ao obter localização', error);
    }
  }

  loadNearbyHospitals(lat: number, lng: number) {
    const location = new google.maps.LatLng(lat, lng);

    // Opções para a busca de hospitais
    const request = {
      location: location,
      radius: 10000, // Raio de busca em metros
      type: ['hospital'], // Tipo de lugar
    };

    // Inicializando o serviço Places
    this.service = new google.maps.places.PlacesService(this.map);

    // Usar a Places API para procurar hospitais
    this.service.nearbySearch(request, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          const place = results[i];

          // Criar um marcador para cada hospital encontrado
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            title: place.name,
          });
        }
      } else {
        console.log('Erro na busca de hospitais:', status);
      }
    });
  }
}
