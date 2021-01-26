export default class Starship {
  constructor(name, _consumables, _passengers) {
    this.name = name;
    this._consumables = this.parseConsumables(_consumables);
    this._passengers = this.parsePassangers(_passengers);
  }

  get maxDaysInSpace() {
    return this._consumables / this._passengers;
  }

  parseConsumables(consumablesString) {
    // eslint-disable-next-line prefer-const
    let [time, timeType] = consumablesString.split(' ');

    time = Number(time);

    if (timeType.startsWith('month')) {
      time *= 30;
    } else if (timeType.startsWith('year')) {
      time *= 365;
    } else if (timeType.startsWith('week')) {
      time *= 7;
    }

    return time;
  }

  parsePassangers(passangersString) {
    return Number(passangersString.replace(',', ''));
  }
}
