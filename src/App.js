import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map";
import SquareAPI from "./API/";
import SideBar from "./component/SideBar";



class App extends Component {
    // State
    constructor(){
      super()
      this.state = {
        venues: [],
        markers: [],
        center: [],
        zoom: 12,
        updateSuperState: obj => {
          this.setState(obj);
        }
      };
    }

// Event handler for the click action in the marker
handleMarkerClick =(marker) => {
  this.closeAllMarkers();
  //console.log(marker);
  marker.isOpen = true;
  this.setState({markers: Object.assign(this.state.markers,marker)});
  const venue = this.state.venues.find(venue => venue.id === marker.id);
  SquareAPI.venuedetails(marker.id).then(res => {
    const newVenue = Object.assign(venue, res.response.venue);
    this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    console.log(newVenue);
  } );
};

//Event handler for the click action in the venue list
listItemClickAction = venue => {
  const marker = this.state.markers.find(marker => marker.id === venue.id);
  this.handleMarkerClick(marker);
  //console.log(venue); 
}

closeAllMarkers = ()=>{
 const markers = this.state.markers.map(marker => {
   marker.isOpen =false;
   return marker;
 })
 this.setState({markers: Object.assign(this.state.markers, markers)});
}


// Deconstruct the results in the promise
componentDidMount(){
// error handling for google map errors
  window.gm_authFailure = () => {
    alert('ERROR!! \nFailed to get Google map.');
    console.log('ERROR!! \nFailed to get Google map.');
 }
  SquareAPI.search({
    near : "Saline,MI",
    query: "Pizza",
    limit : 10,
    radius :2000  
  }).then(
        results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen:false,
            isVisible:true,
            id: venue.id
          };
        });
this.setState({ venues, center, markers });
console.log(results);
        })
      }


     
  render() {
    return (
      <div className="App"> 
          <SideBar{...this.state}  
          listItemClickAction = {this.listItemClickAction}
          />
        <Map {...this.state}
        handleMarkerClick ={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
