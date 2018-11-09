import React, { Component } from "react";


export default class ListItem extends Component {
    render(){
        return(
        <li 
        className="listItem" aria-label='filtered list item' tabIndex='0' 
         onClick={()=>this.props.listItemClickAction(this.props)}>
         <img src = {this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix}
              alt ={this.props.categories[0].name} />
         {this.props.name}
        </li>
        );

    }
}

