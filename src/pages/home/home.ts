import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import 'leaflet'; // Creates a global L namespace.
import 'leaflet.markercluster';
import 'leaflet-routing-machine';
import 'leaflet-easybutton';
import 'leaflet-search';

declare var L: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: L.Map;
  center: L.PointTuple;
  cluster;
  control;
  constructor(public navCtrl: NavController) {
    this.cluster = L.markerClusterGroup();

  }

  ionViewDidLoad() {
    this.center = [28.644800, 77.216721];
    setTimeout(this.leafletMap(), 100);

  }

  leafletMap(){
    this.map = L.map('map', {
      center: this.center,
      zoomControl: false,
      zoom: 16,
      drawControl: true
    });
    L.tileLayer("https://api.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token={accessToken}", {
      accessToken: 'access-token',
      zoomControl: false
    })
      .addTo(this.map);
    this.map.on('click', (e)=>{this.onMapClick(e)});
    // var searchLayer = L.layerGroup().addTo(this.map);

    // this.map.addControl( new L.Control.Search({layer: searchLayer}) );

    //Cluster
    // this.cluster.addLayer(L.marker([28.644800, 77.216721]));
    // this.cluster.addLayer(L.marker([28.644800, 77.216721]));
    // this.cluster.addLayer(L.marker([28.644800, 77.216721]));
    // this.cluster.addLayer(L.marker([28.644800, 77.216721]));

    // this.map.addLayer(this.cluster);

    //Marker
    // const marker = new L.Marker(this.center);
    // this.map.addLayer(marker);

    // marker.bindPopup("<p>Tashi Delek.<p>Delhi</p>");

    let way = [
      L.latLng(28.644800, 77.216721),
      L.latLng(28.644800, 77.116721)
    ];
    this.control = L.Routing.control({
      // createMarker: function() { return null}, //remove markers
      addWaypoints: false,
      waypoints: way,
      allowUTurn: true,
      routeWhileDragging: false
    }).addTo(this.map);

    this.control.on('routesfound', function(e) {
      var routes = e.routes;
      console.log(routes);
    });
    this.control.hide();

    L.easyButton('<i >Center</i>', function(btn, map){
      var myLocation = [28.644800, 77.216721];
      map.setView(myLocation);
    }).addTo( this.map );


  }

  onMapClick(e) {
    var container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn;

    if(this.control.getWaypoints().length > 0){
      destBtn = createButton('Go to this location', container);
    }
    let self = this;

    L.DomEvent.on(startBtn, 'click', function() {
      self.control.spliceWaypoints(0, 1, e.latlng);
      self.map.closePopup();
    });


    L.DomEvent.on(destBtn, 'click', function() {
      self.control.spliceWaypoints(self.control.getWaypoints().length - 1, 1, e.latlng);
      self.map.closePopup();
    });

    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(this.map);
    function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    }
    // console.log(e.latlng.lng, e.latlng.lat);
    // const marker = new L.Marker([e.latlng.lat, e.latlng.lng]);
    // this.map.addLayer(marker);

  }

  checkSummary  = () => {
    this.control.getPlan()

  };



}
