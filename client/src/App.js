import React, {Component} from 'react';
import {Map, TileLayer, Marker, Popup, Polygon} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {Card, CardText, CardTitle} from 'reactstrap';
import Select from "react-select";
import Control from 'react-leaflet-control';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import MultiSelect from './components/MultiSelect';
//import DropZone from './components/DropZone';
import Datepicker from './components/DatePicker';
import OverlayInfo from './components/InfoTooltips/OverlayInfo';
import DateTooltip from './components/InfoTooltips/DateTooltip';
import MultiSelectTooltip from './components/InfoTooltips/MultiSelectTooltip';
import UploadImageForm from './components/UploadImageForm';
import { positionMarker, gpsDirectionMarker} from './components/Markers';
import './App.css';
// Roterer markører 
import 'leaflet-rotatedmarker';

import { getImages, getLocation, getFilesProject, getPictures } from './API';

const projectOptions = [
  {value: [63.551440, 10.933473], label: 'E6 Kvithammar - Åsen'},
  {value: [58.093886,7.644329], label: 'E39 Mandal'},
  {value: [59.001439, 9.613338], label: 'E18 Rugtvedt Dørdal'}
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

class App extends Component {
 
  state = {
    location: {
      lat: 63.430515,
      lng: 10.395053,
    },
    positionCoord: {
      lat: 0,
      lng: 0,
    },
    haveUsersLocation: false,
    zoom: 5,
    selectedOption: null,
    changeDate: false,
    dateValues: [new Date(), new Date()],
    images: [],
    urls: [],
  }

  componentDidMount() {
    getImages()
      .then(images => {
        this.setState({
          images: images.images
        });
      });
    
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

    // SORTERER PÅ PROSJEKT
    getFilesProject(selectedOption.label)
    .then(images => {
      this.setState({
        images: images.files
      });
    });
  };

  getPositionOfUser = () =>{
    getLocation()
    .then(positionCoord => {
      this.setState({
        positionCoord,
        haveUsersLocation: true,
      });
    });
  }

  dateChanged = (value) => {
    console.log(value);

    this.setState({
      changeDate: true
    });


  }
  

  render(){
    const position = [this.state.location.lat, this.state.location.lng];
    const { selectedOption, positionCoord } = this.state;

    return (

      <div className="app">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topleft">
            <button onClick={this.getPositionOfUser}>
              Min <br></br>Posisjon
            </button>
          </Control>
          {
            this.state.haveUsersLocation ? (
              <Marker 
                position={positionCoord} 
                icon={positionMarker}>
                <Popup>Din posisjon:)</Popup>
              </Marker>
          ) : (
            ""
          )}
          <MarkerClusterGroup>
            {
              this.state.images.length > 0 && this.state.images.map(image => (
                <Marker
                  key={image._id}
                  position={[image.latitude, image.longitude]}
                  icon={gpsDirectionMarker}
                  rotationAngle={image.GPSImgDirection}
                >
                  <Popup>
                    <b>Prosjekt: </b>{image.prosjekt} {image.prosjektOmrade}<p/>
                    <b>Parsell: </b>{image.parsell}<p/>
                    <b>Kategori: </b>{image.kategori}<p/>
                    <b>Høydemeter: </b>{image.GPSAltitude}<p/>
                    <b>Dato tatt: </b>{image.captureDate}<p/>
                    <img src={`${getPictures(image.imageName)}`} alt={image.imageName} className="popupImage"/>
                  </Popup>
                </Marker>
              ))}
          </MarkerClusterGroup>

          <Polygon
            onclick={() =>
              this.setState({
                location: {
                  lat: 63.55144,
                  lng: 10.933473,
                },
                zoom: 11,
              })
            }
            color={"blue"}
            positions={polygonE6KAA}
          />
          <Polygon
            onclick={() =>
              this.setState({
                location: {
                  lat: 59.001439,
                  lng: 9.613338,
                },
                zoom: 11,
              })
            }
            color={"#d46504"}
            positions={polygonE18RD}
          />
          <Polygon
            onclick={() =>
              this.setState({
                location: {
                  lat: 58.093886,
                  lng: 7.644329,
                },
                zoom: 11,
              })
            }
            color={"blue"}
            positions={polygonE39M}
          />
        </Map>

        <Card className="message-form">
          <CardTitle className="title">Bildelagring</CardTitle>
          <Tabs>
            <TabList>
              <Tab>Søk i Bilder</Tab>
              <Tab>Last opp Bilder</Tab>
            </TabList>

            <TabPanel>
              <p>
                <b>Velg verdier for søket ditt</b>
              </p>
              <OverlayInfo />
              <Select
                className="select-option"
                value={selectedOption}
                onChange={this.handleChange}
                options={projectOptions}
                placeholder="velg prosjekt"
                menuColor="blue"
              />            
              <MultiSelectTooltip />
              <MultiSelect className="multi-select" />
              <DateTooltip />
              <Datepicker 
                images={this.images}
              />
            </TabPanel>
            <TabPanel>
              <CardText> <b>Last oppp bilder:</b></CardText>
              <UploadImageForm />
            </TabPanel>
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default App;
