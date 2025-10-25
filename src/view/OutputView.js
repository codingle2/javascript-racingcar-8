import { Console } from '@woowacourse/mission-utils';

export const OutputView = {
  printStart() {
    Console.print('\n실행 결과');
  },

  printRoundResult(cars) {
    cars.forEach((car) => {
      const position = '-'.repeat(car.getPosition());
      Console.print(`${car.getName()} : ${position}`);
    });
    Console.print('');
  },

  printWinners(winners) {
    Console.print(`최종 우승자 : ${winners.join(', ')}`);
  },

  printError(message) {
    Console.print(message);
  },
};
