import "bootstrap";

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { initMapbox } from '../packs/init_mapbox';
import { initAutocomplete } from '../packs/init_autocomplete';

initMapbox();
initAutocomplete();
