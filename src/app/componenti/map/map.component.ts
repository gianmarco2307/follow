import { Component, Input, OnInit } from '@angular/core';
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
export class MapComponent implements OnInit {
  map!: Map;

  @Input({required: true}) coordinates: string = '';

  ngOnInit(): void {
    // Coordinate di esempio (latitudine e longitudine)
    const coordinates = this.convertCoordinates(this.coordinates);

    const transformedCoordinates = fromLonLat(coordinates);

    // Creazione del marker
    const marker = new Feature({
      geometry: new Point(transformedCoordinates),
    });

    // Stile del marker
    marker.setStyle(
      new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          anchor: [0.5, 1],
        }),
      }),
    );

    // Layer vettoriale per il marker
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });

    // Configurazione della mappa
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: transformedCoordinates,
        zoom: 19,
        projection: 'EPSG:3857',
      }),
    });
  }

  convertCoordinates(coordinates: string): number[] {
    let newCoordinates = [parseFloat(coordinates.split(', ')[0]), parseFloat(coordinates.split(', ')[1])];
    return newCoordinates;
  }
}