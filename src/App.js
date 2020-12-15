import React, {Component} from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup, Polygon} from 'react-leaflet';
import {Card, CardText, CardTitle} from 'reactstrap';
import Select from "react-select";
import Control from 'react-leaflet-control';
import MultiSelect from './components/MultiSelect';
import DropZone from './components/DropZone';
import Datepicker from './components/DatePicker';
import OverlayInfo from './components/InfoTooltips/OverlayInfo';
import DateTooltip from './components/InfoTooltips/DateTooltip';
import AreaTooltip from './components/InfoTooltips/AreaTooltip';
import MultiSelectTooltip from './components/InfoTooltips/MultiSelectTooltip';
import './App.css';

//Forskjellige ikoner
var myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

/*
const cameraIcon = new Icon({
  iconUrl: './images/pin-1976106.svg',
  iconSize:     [30, 30], // size of the icon
  iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});*/

const projectOptions = [
  {value: [63.551440, 10.933473], label: 'E6 Kvithammar Åsen'},
  {value: [58.093886,7.644329], label: 'E39 Mandal'},
  {value: [59.001439, 9.613338], label: 'E18 Rugtvedt Dørdal'}
  //Legge til resterende
];

const areaOptions = [
  {value: [63.551440, 10.933473], label: 'Holvegen'},
  {value: [58.093886,7.644329], label: 'Østre tunnel'},
  {value: [59.001439, 9.613338], label: 'Resterende'}
  //Legge til resterende
];

const polygonE6KAA = [
  [63.490113, 10.881942],
  [63.539078, 10.784397],
  [63.611563, 11.037967],
  [63.604848, 11.073352],
];

const polygonE18RD = [
  [59.034210, 9.695156],
  [59.042688, 9.653614],
  [58.972837, 9.452311],
  [58.953720, 9.486643],
];

const polygonE39M = [
  [58.022543, 7.496523],
  [58.038903, 7.469057],
  [58.109921, 7.638652],
  [58.105165, 7.807159],
  [58.089601, 7.804134]
];



export default class App extends Component {
 
  state = {
    location: {
      lat: 63.430515,
      lng: 10.395053,
    },
    positionMarker: {
      lat: 0,
      lng: 0,
    },
    zoom: 5,
    selectedOption: null,
  }

  

  handleChange = (selectedOption) => {
    this.setState({
      location: {
        lat: selectedOption.value[0],
        lng: selectedOption.value[1]
      },
      selectedOption,
      zoom: 11,
    });
  };


  getPositionOfUser = () =>{
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        positionMarker: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUsersLocation: true,
      });
    }, () => {
      console.log("Får ikke tak i posisjonen til brukeren...");
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location =>{
          this.setState({
            positionMarker: {
              lat: location.latitude,
              lng: location.longitude
            },
            haveUsersLocation: true,
          });
        });
    });

  }

  render(){
    const position = [this.state.location.lat, this.state.location.lng];
    const { selectedOption, positionMarker } = this.state;

    return(
      <div className="app">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topleft">
          < button onClick={this.getPositionOfUser}>Min <br></br>Posisjon</button>
          </Control>
          <Marker 
            position={positionMarker}
            icon={myIcon}
            color={'red'}
          >
            <Popup>
              Din posisjon:)
            </Popup>
          </Marker>
          
          <Polygon 
          onclick={ () => this.setState({
            location: {
              lat: 63.551440, 
              lng: 10.933473
            }, 
            zoom: 11,})} 
          color={'blue'} 
          positions={polygonE6KAA}
        />
        <Polygon 
          onclick={ () => this.setState({
            location: {
              lat: 59.001439, 
              lng: 9.613338
            }, 
            zoom: 11})} 
          color={'#d46504'} 
          positions={polygonE18RD}
        />
        <Polygon 
          onclick={ () => this.setState({
            location: {
              lat: 58.093886,
              lng: 7.644329
            }, 
            zoom: 11})} 
          color={'blue'} 
          positions={polygonE39M}
        />
        </Map>

        <Card className="message-form">
          <CardTitle className="title">Bildelagring</CardTitle>
          <OverlayInfo/>
          <Select
              className="select-option"
              value={selectedOption}
              onChange={this.handleChange}
              options={projectOptions}
              placeholder='velg prosjekt'
              menuColor='blue'
            />
            <AreaTooltip/>
            <Select
              className="select-area"
              options={areaOptions}
              placeholder='velg område'
              menuColor='blue'
            />

            <MultiSelectTooltip/>
            <MultiSelect 
              className="multi-select"
            />
            <DateTooltip/>
            <Datepicker/>
            <br></br>
            <CardText>Last oppp bilder:</CardText>
            <DropZone/>
        </Card>
      </div>
    );
  }
}
