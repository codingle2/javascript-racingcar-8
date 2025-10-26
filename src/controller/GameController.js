import { InputView } from '../view/InputView.js';
import { OutputView } from '../view/OutputView.js';
import { Race } from '../model/Race.js';
import InputValidator from '../utils/InputValidator.js';
import ErrorMessage from '../utils/ErrorMessage.js';
import { MissionUtils } from "@woowacourse/mission-utils";

export class GameController {
  async start() {
    try {
      const carNames = await InputView.readCarNames();
      InputValidator.validateCarNames(carNames);

      const tryCount = await InputView.readTryCount();
      InputValidator.validateTryCount(tryCount);

      const race = new Race(carNames, tryCount);

      OutputView.printStart();
      this._playRounds(race, tryCount);
      
      if (!race.anyCarMoved()) {
        OutputView.printError(ErrorMessage.NON_MOVED_CAR);
      }

      const winners = race.getWinners();
      OutputView.printWinners(winners);
    } catch (error) {
      OutputView.printError(error.message);
      throw error;
      //return;
    }
  }

  _playRounds(race, tryCount) {
    for (let i = 0; i < tryCount; i++) {
      race.playRound();
      OutputView.printRoundResult(race.cars);
    }
  }
}
