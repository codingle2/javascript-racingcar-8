import { RandomUtils } from '../utils/RandomUtils.js';

export class Car {
  static MOVE_THRESHOLD = 4;

  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  move() {
    const randomNumber = RandomUtils.pick();

    if (randomNumber >= Car.MOVE_THRESHOLD) {
      this.position += 1;
    }
  }

  get positionValue() {
    return this.position;
  }

  get carName() {
    return this.name;
  }
}
