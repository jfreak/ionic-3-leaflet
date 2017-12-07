# Ionic 3 Leaflet Maps
### Leaflet Map

>        npm install leaflet --save

>        npm install @types/leaflet --save

### Leaflet Markers
>      const marker = new L.Marker(this.center);

>      this.map.addLayer(marker);

### Leaflet Marker Cluster

>        npm install leaflet.markercluster --save

>        npm install --save-dev @types/leaflet-markercluster


>        import 'leaflet';

>        import 'leaflet.markercluster';

### Marker on click/touch

>         this.map.on('click', (e)=>{this.onMapClick(e)});

>         onMapClick(e) {
>              console.log(e.latlng.lng, e.latlng.lat);
>              const marker = new L.Marker([e.latlng.lat, e.latlng.lng]);
>              this.map.addLayer(marker);
>              }

### Leaflet Routing Control

>            L.Routing.control({
>            // createMarker: function() { return null}, //remove markers
>            waypoints: [
>            L.latLng(28.644800, 77.216721),
>            L.latLng(28.644800, 77.116721)
>                  ],
>           }).addTo(this.map);

### Leaflet Route Summary

>            this.control.on('routesfound', function(e) {
>                  var routes = e.routes;
>                  console.log(routes);
>                });

### Leaflet Easy Button

>           npm install --save leaflet-easybutton

>           L.easyButton('<img src="image path">', function(btn, map){
>                  var myLocation = [28.644800, 77.216721];
>                  map.setView(myLocation);
>                }).addTo( this.map );






