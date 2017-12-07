import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import L from "leaflet";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  map: L.Map;
  center: L.PointTuple;

  constructor(public navCtrl: NavController) {
    // this.center = [12.972442, 77.594563];
    // this.leafletMap();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.center = [28.644800, 77.216721];
    this.leafletMap();
  }

  leafletMap = () => {
    this.map = L.map('mapId2', {
      center: this.center,
      zoom: 13
    });

    const positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="">Leaflet</a>'
    }).addTo(this.map);

    const marker = new L.Marker(this.center);
    this.map.addLayer(marker);

    marker.bindPopup("<p>Bangalore.</p>");
  }

}
