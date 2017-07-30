import React, { Component } from 'react';
import Hand from '../components/hand';

class Player extends Component {
  render() {
    return (
      <div className='player'>
        <h4>{this.props.name}</h4>
        <div>
          <Hand cardData={this.props.cardData}/>
        </div>
      </div>
    );
  }
}

export default Player;