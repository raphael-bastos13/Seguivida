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
      const position = await Geolocation.getCurrentPosition();

      const loader = new Loader({
        apiKey: 'AIzaSyBF7Yw_2p3Nnth3XyS5g_I_2p5BWXXNblM',
        version: 'weekly',
      });

      loader
        .load()
        .then(() => {
          const google = (window as any).google;

          const mapOptions = {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            zoom: 15,
          };

          this.map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            mapOptions
          );

          new google.maps.Marker({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            map: this.map,
            title: 'Minha localização atual',
          });

          this.loadNearbyHospitals(
            position.coords.latitude,
            position.coords.longitude
          );
        })
        .catch((error) =>
          console.error('Erro ao carregar Google Maps:', error)
        );
    } catch (error) {
      console.log('Erro ao obter localização', error);
    }
  }

  loadNearbyHospitals(lat: number, lng: number) {
    const location = new google.maps.LatLng(lat, lng);

    const request = {
      location: location,
      radius: 5000, // Raio de busca
      type: 'hospital', // Tipo de lugar
      keyword: 'hospital', // Refinar por palavras-chave
    };

    this.service = new google.maps.places.PlacesService(this.map);

    this.service.nearbySearch(request, (results: any, status: any) => {
      console.log('Status da busca:', status);
      console.log('Resultados:', results);

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((place: any) => {
          if (place.types.includes('hospital')) {
            new google.maps.Marker({
              position: place.geometry.location,
              map: this.map,
              title: place.name,
            });
          }
        });
      } else {
        console.error('Erro na busca de hospitais:', status);
      }
    });
  }
}
