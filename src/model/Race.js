import { Car } from './Car.js';

export class Race {
  constructor(carNames, tryCount) {
    this.cars = carNames.map((name) => new Car(name));
    this.tryCount = tryCount;
  }

  playRound() {
    this.cars.forEach((car) => {
      car.move();
    });
  }

  playAllRounds() {
    Array.from({ length: this.tryCount }).forEach(() => {
      this.playRound();
    });
  }

  getWinners() {
    const positions = this.cars.map((car) => car.getPosition());
    const maxPosition = Math.max(...positions);

    return this.cars
      .filter((car) => car.getPosition() === maxPosition)
      .map((car) => car.getName());
  }
}
