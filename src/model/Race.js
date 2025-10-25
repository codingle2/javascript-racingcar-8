export class Race {
  constructor(carNames, tryCount) {
    this.cars = carNames.split(",").map((name) => ({ name: name.trim(), position: 0 }));
    this.tryCount = tryCount;
  }

  playRound() {
    this.cars.forEach((car) => {
      if (Math.random() >= 0.4) {
        car.position++;
      }
    });
  }

  getWinners() {
    const maxPos = Math.max(...this.cars.map((car) => car.position));
    return this.cars.filter((c) => c.position === maxPos).map((c) => c.name);
  }
}
