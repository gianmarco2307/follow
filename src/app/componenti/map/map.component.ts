import { Component, Input, OnChanges } from '@angular/core';
import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnChanges {
  map: Map | null = null;
  marker: Feature | null = null;
  vectorLayer: VectorLayer<VectorSource> | null = null;

  @Input({required: true}) coordinates: string = '';

  ngOnChanges(): void {
    // Coordinate di esempio (latitudine e longitudine)
    const coordinates = this.convertCoordinates(this.coordinates);

    const transformedCoordinates = fromLonLat(coordinates);

    if(this.map) {
      if(this.marker){
        this.marker.setGeometry(new Point(transformedCoordinates));
      }

      this.map.getView().setCenter(transformedCoordinates);
      this.map.getView().setZoom(19);
    } else {
      // Creazione del marker
      this.marker = new Feature({
        geometry: new Point(transformedCoordinates),
      });

      // Stile del marker
      this.marker.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            anchor: [0.5, 1],
          }),
        }),
      );

      // Layer vettoriale per il marker
      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [this.marker],
        }),
      });

      // Configurazione della mappa
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          this.vectorLayer,
        ],
        view: new View({
          center: transformedCoordinates,
          zoom: 19,
          projection: 'EPSG:3857',
        }),
      });
    }
  }

  convertCoordinates(coordinates: string): number[] {
    let newCoordinates = [parseFloat(coordinates.split(', ')[0]), parseFloat(coordinates.split(', ')[1])];
    return newCoordinates;
  }
}