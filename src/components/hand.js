import React, { Component } from 'react';
import Card from './card';

export default class Hand extends Component{
  render() {
    
    const cards = this.props.cardData.map(cardData => <Card key={cardData.code} data={cardData} />);
    
    return (
      <div>
        {cards}
      </div>
    );
  }
}