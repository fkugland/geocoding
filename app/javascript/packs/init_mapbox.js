import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


const initMapbox = () => {
  const mapElement = document.getElementById('map');

  const fitMapToMarkers = (map, markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([marker.lng, marker.lat]))
    map.fitBounds(bounds, {padding: 70, maxZoom: 15});
  }

  const addMarkersToMap = (map, markers) => {
    markers.forEach((marker) => {
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.backgroundRepeat = 'no-repeat';
      element.style.width = '20px';
      element.style.height = '25px';

      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

      new mapboxgl.Marker(element)
      .setLngLat([marker.lng, marker.lat])
      .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(marker.infoWindow))
      .addTo(map);
    })
  }

  if (mapElement){
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken }));

    const markers = JSON.parse(mapElement.dataset.markers);

    addMarkersToMap(map, markers)
    fitMapToMarkers(map, markers)
  }
};

export { initMapbox };
