import { InputView } from '../view/InputView.js';
import { OutputView } from '../view/OutputView.js';
import { Race } from '../model/Race.js';

export class GameController {
  async start() {
    try {
      const carNames = await InputView.readCarNames();
      const tryCount = await InputView.readTryCount();

      const race = new Race(carNames, tryCount);

      OutputView.printStart();
      this._playRounds(race, tryCount);

      const winners = race.getWinners();
      OutputView.printWinners(winners);
    } catch (error) {
      OutputView.printError(error.message);
      throw error; // 테스트용 reject
    }
  }

  _playRounds(race, tryCount) {
    for (let i = 0; i < tryCount; i++) {
      race.playRound();
      OutputView.printRoundResult(race.cars);
    }
  }
}
