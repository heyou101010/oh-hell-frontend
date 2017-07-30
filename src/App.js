import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './components/player';
import NameForm from './components/nameForm';
import Deck from './services/deck';

class App extends Component {
  constructor(props) {
    super(props);
    
    this._idCounter = 0;
    
    this.state = {
      hasGameStarted: false,
      players: [],
      deckId: undefined,
      pastTop: false,
      handSize: 0,
      round: 0
    };
    
    this.getNewDeck = this.getNewDeck.bind(this);
    this.submitNewPlayer = this.submitNewPlayer.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.dealCards = this.dealCards.bind(this);
  }
  
  async getNewDeck() {
    this._deck = new Deck();
    this.setState({deckId: await this._deck.getNewDeck()});
  }
  
  submitNewPlayer(name) {
    let players = this.state.players;
    players.push({id: this._idCounter++, name: name, cardData: []});
    this.setState({players: players});
  }
  
  beginGame() {
    this.getNewDeck();
    this.setState({hasGameStarted: true});
  }
  
  getMaxHand(numOfPeople) {
    return Math.floor(51/numOfPeople);
  }
  
  async dealCards() {
    await this._deck.shuffle(this.state.deckId);
    let handSize = this.state.handSize;
    if (this.state.pastTop) {
      handSize--;
    } else if (this.state.handSize < this.getMaxHand(this.state.players.length)) {
      handSize++; 
    } else {
      this.setState({pastTop: true});
      handSize--;  
    }

    this.setState({handSize: handSize});
    
    let playerHands = [];
    this.state.players.forEach(player => playerHands.push([]));
    const cardsToDeal = await this._deck.drawCardsToDeal(this.state.deckId, handSize, 
      this.state.players.length);
    cardsToDeal.forEach((card, index) => playerHands[index % this.state.players.length].push(card));
    console.log(playerHands);
    let playersWithCards = this.state.players;
    playerHands.forEach((hand, index) => playersWithCards[index % this.state.players.length].cardData = hand);
    this.setState({players: playersWithCards});
  }
  
  render() {
    
    const players = this.state.players.map((player) => <Player key={player.id} name={player.name} cardData={player.cardData}/>);
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Oh Hell</h2>
        </div>
        <div className="game-table">
          {players}
        </div>
        {!this.state.hasGameStarted ?
          <div>
            <NameForm onSubmit={this.submitNewPlayer} />
            <button onClick={this.beginGame}> Begin Game </button>
          </div>
          :
          <div>
            <button onClick={this.dealCards}> Deal </button>
          </div>
        }
      </div>
    );
  }
}

export default App;
