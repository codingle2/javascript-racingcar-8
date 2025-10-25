import { GameController } from './controller/GameController.js';

export default class App {
  async run() {
    const controller = new GameController();
    await controller.start();
  }
}