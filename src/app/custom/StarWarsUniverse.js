import Starship from './Starship';

export default class StarWarsUniverse {
  constructor() {
    this.starships = [];
  }

  get theBestStarship() {
    const bestStarship = {
      ship: null,
      maxDaysInSpace: -1,
    };

    this.starships.forEach((ship) => {
      if (ship.maxDaysInSpace > bestStarship.maxDaysInSpace) {
        bestStarship.ship = ship;
        bestStarship.maxDaysInSpace = ship.maxDaysInSpace;
      }
    });

    return bestStarship.ship;
  }

  async _getStarshipCount() {
    const response = await fetch('https://swapi.dev/api/starships/');
    const data = await response.json();

    return data.count;
  }

  async _createStarships(count) {
    const starships = [];

    for (let i = 1; i <= count; i++) {
      const response = await fetch(`https://swapi.dev/api/starships/${i}`);

      if (!response.ok || response.status === 404) continue;

      const starshipData = await response.json();

      starships.push(starshipData);
    }

    return starships;
  }

  _validateData(ships) {
    ships.forEach((ship) => {
      if ((ship.consumables && ship.consumables !== 'unknown')
        && (ship.passengers && ship.passengers !== 'n/a' && ship.passengers !== '0')) {
        const starship = new Starship(ship.name, ship.consumables, ship.passengers);

        // Using StarWarsUniverse.starships instead of this.starships because of what is said in the task requirements
        StarWarsUniverse.starships.push(starship);
      }
    });
  }

  async init() {
    const starshipCount = await this._getStarshipCount();
    const starships = await this._createStarships(starshipCount);

    this._validateData(starships);
  }
}
