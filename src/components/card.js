import React, { Component } from 'react';

export default class Card extends Component{
  render () {
    
    const value = this.props.data.value;
    const suit = this.props.data.suit;
    
    return (
        <img id={this.props.data.code} className='card' src={this.props.data.imageUrl} alt={value + ' ' + suit}/>
    );
  }
}