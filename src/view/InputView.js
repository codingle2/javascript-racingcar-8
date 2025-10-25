import { Console } from '@woowacourse/mission-utils';

export const InputView = {
  async readCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)\n'
    );
    return this._parseCarNames(input);
  },

  async readTryCount() {
    const input = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    return this._parseTryCount(input);
  },

  _parseCarNames(input) {
  return input.split(',').map((name) => {
    const trimmed = name.trim();
    if (trimmed.length === 0 || trimmed.length > 5) {
      throw new Error('[ERROR] 자동차 이름은 1~5자 사이여야 합니다.');
    }
    return trimmed;
  });
},

_parseTryCount(input) {
  const tryCount = Number(input);
  if (Number.isNaN(tryCount) || tryCount < 1) {
    throw new Error('[ERROR] 시도 횟수는 1 이상의 숫자여야 합니다.');
  }
  return tryCount;
}

};
