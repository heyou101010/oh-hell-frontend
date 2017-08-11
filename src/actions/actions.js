import GameDispatcher from './gameDispatcher';

const ADD_PLAYER = 'add-player';
const DEAL_CARDS = 'deal-cards';
const BEGIN_GAME = 'begin-game';

export const Actions = {
  addPlayer(name) {
    GameDispatcher.dispatch({
      type: ADD_PLAYER,
      data: {
        name
      }
    });
  },
  
  dealCards(numberOfPlayers, numberOfCards) {
    GameDispatcher.dispatch({
      type: DEAL_CARDS,
      data: {
        numberOfPlayers,
        numberOfCards
      }
    });
  },
  
  beginGame() {
    GameDispatcher.dispatch({
      type: BEGIN_GAME,
      data: {
        hasGameStarted: true
      }
    });
  },
};