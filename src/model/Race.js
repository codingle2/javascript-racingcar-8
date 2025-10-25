import { Car } from './Car.js';

export class Race {
  constructor(carNames, tryCount) {
    this.cars = carNames.map((name) => new Car(name));
    this.tryCount = tryCount;
  }

  playRound() {
    this.cars.forEach((car) => {
      if (typeof car.move !== 'function') {
        throw new Error('Race.cars 배열에 Car 인스턴스가 아닙니다.');
      }
      car.move();
    });
  }

  getWinners() {
    const maxPosition = Math.max(...this.cars.map((car) => car.getPosition()));
    return this.cars
      .filter((car) => car.getPosition() === maxPosition)
      .map((car) => car.getName());
  }
}
