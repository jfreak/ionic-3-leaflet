import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import L from "leaflet";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  propertyList = [];
  center: L.PointTuple;
  map;

  constructor(public navCtrl: NavController, private http: Http) {
    this.http.get('assets/data/data.json')
      .map(res => res.json())
      .subscribe(data => {
          this.propertyList = data.properties;
        },
        err => console.log("error is " + err), // error
        () => this.leafletMap()
      );
  }

  ionViewDidLoad = () => {
    this.map = L.map('mapId').setView([42.35663, -71.1109], 16);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> Leaflet'
    }).addTo(this.map);
  };

  leafletMap = () => {
    console.log("property" + this.propertyList.length);
    for (let property of this.propertyList) {
      L.marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  };

}
