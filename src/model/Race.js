import { Car } from './Car.js';

export class Race {
  constructor(carNames, tryCount) {
    this.cars = carNames
      .split(",")
      .map((name) => new Car(name.trim())); // Car 객체 생성
    this.tryCount = tryCount;
  }

  playRound() {
    this.cars.forEach((car) => car.move()); // 각 자동차 이동
  }

  getWinners() {
    const maxPos = Math.max(...this.cars.map((car) => car.getPosition()));
    return this.cars
      .filter((c) => c.getPosition() === maxPos)
      .map((c) => c.getName());
  }

  anyCarMoved() {
    return this.cars.some((c) => c.getPosition() > 0);
  }
}
