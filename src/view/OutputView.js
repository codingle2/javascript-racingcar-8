import { MissionUtils } from "@woowacourse/mission-utils";

export class OutputView {
  static printStart() {
    MissionUtils.Console.print("\n실행 결과");
  }

  static printRoundResult(cars) {
    cars.forEach((car) => {
      MissionUtils.Console.print(`${car.name} : ${"-".repeat(car.position)}`);
    });
    MissionUtils.Console.print("");
  }

  static printWinners(winners) {
    MissionUtils.Console.print(`최종 우승자 : ${winners.join(", ")}`);
  }

  static printError(message) {
    MissionUtils.Console.print(message);
  }
}
