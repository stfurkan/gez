import React, { Component } from 'react';
import L from 'leaflet';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const { places, visits } = this.props;

    this.map = L.map('dataMap', {
      zoom: 1,
      minZoom: 1,
      maxZoom: 18,
      maxBounds: [
        [-100, -190],
        [100, 190]
      ],
      center: [30, 30],
      worldCopyJump: true,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    let greenIcon = new L.Icon({
      iconUrl:
        'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    places.forEach(place => {
      let marker;

      if (visits.includes(place.id)) {
        marker = L.marker([place.latitude, place.longitude], {
          icon: greenIcon
        });
      } else {
        marker = L.marker([place.latitude, place.longitude]);
      }

      marker.on('click', () => {
        this.props.selectPlace(place.id);
      });

      marker.bindPopup(`<b>${this.props.lang.place}:</b> ${place.name}`);
      marker.addTo(this.map);
    });
  }

  componentDidUpdate = (pp, ps) => {
    if (pp.places !== this.props.places || pp.visits !== this.props.visits) {
      this.map.remove();
      this.map = L.map('dataMap', {
        zoom: 1,
        minZoom: 1,
        maxZoom: 18,
        maxBounds: [
          [-100, -190],
          [100, 190]
        ],
        center: [30, 30],
        worldCopyJump: true,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })
        ]
      });

      let greenIcon = new L.Icon({
        iconUrl:
          'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      this.props.places.forEach(place => {
        let marker;

        if (this.props.visits.includes(place.id)) {
          marker = L.marker([place.latitude, place.longitude], {
            icon: greenIcon
          });
        } else {
          marker = L.marker([place.latitude, place.longitude]);
        }

        marker.on('click', () => {
          this.props.selectPlace(place.id);
        });

        marker.bindPopup(`<b>${this.props.lang.place}:</b> ${place.name}`);
        marker.addTo(this.map);
      });
    }
  };

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div ref={this.mapRef} id='dataMap' />;
  }
}
