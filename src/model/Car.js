import { RandomUtils } from '../utils/RandomUtils.js';

export class Car {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  move() {
    if (RandomUtils.pick() >= 4) {
      this.position += 1;
    }
  }

  getPosition() {
    return this.position;
  }

  getName() {
    return this.name;
  }
}
