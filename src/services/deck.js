const BASE_URL = 'https://deckofcardsapi.com/api';

export default class Deck {
  
  async getNewDeck() {
    const url = `${BASE_URL}/deck/new/shuffle/`;
    const response = await fetch(url);
    const data = await response.json();
    return data.deck_id;
  }
  
  async shuffle(deckId) {
    const url = `${BASE_URL}/deck/${deckId}/shuffle/`;
    const response = await fetch(url);
    const data = await response.json();
    return data.success;
  }
  
  async drawCardsToDeal(deckId, cardsPerPerson, numOfPeople) {
    const url = `${BASE_URL}/deck/${deckId}/draw/?count=${cardsPerPerson*numOfPeople}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data.cards.map(apiCard => {
      return {
        value: apiCard.value,
        suit: apiCard.suit,
        code: apiCard.code,
        imageUrl: apiCard.images.png
      };
    });
    
  }
  
}