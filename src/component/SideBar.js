import React, { Component } from "react";
import VenueList from "./VenueList";

export default class SideBar extends Component {
   
   // state of the class
   constructor(){
       super(); // call's the parent's constructor
       this.state = {
           query : "", //initial state of the search Filter is blank
           venues: []
       };
   }

//event handler on filter list items
handleFilterVenues = () => {
    if (this.state.query.trim !== ""){
        const venues = this.props.venues.filter(venue => venue.name
              .toLowerCase()
            .includes(this.state.query.toLocaleLowerCase())
        );
        console.log(venues);
        return venues;
    }
    return this.props.venues;    
};

// event handler for the change in filter to show only the marker that matches with the venue
      handleChange = e => {
          this.setState({ query: e.target.value });
          const markers = this.props.venues.map(venue => {
              const isMatched = venue.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
              const marker = this.props.markers.find(marker => marker.id === venue.id);
              if (isMatched){
                  marker.isVisible = true;
              } else {
                  marker.isVisible = false;
              }
              return marker;
              })
              this.props.updateSuperState({ markers })
      };

    render(){
        return(
            <div className ="sideBar" id ="sideBar" >
               <input type ="search" id ="searchBar" aria-label='search Bar' tabIndex='0' 
                    placeholder="Filter your search here..."
                    onChange={this.handleChange} />
            <VenueList
             {...this.props} 
             venues = {this.handleFilterVenues()}         
            listItemClickAction ={this.props.listItemClickAction}/>
            </div>
        )

    }
}