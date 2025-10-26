import { Random } from '@woowacourse/mission-utils';

export const RandomUtils = {
  pick() {
    return Random.pickNumberInRange(0, 9);
  }
};
