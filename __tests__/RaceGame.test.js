// __tests__/RaceGameRealtime.test.js
import InputValidator from '../src/utils/InputValidator.js';
import { Race } from '../src/model/Race.js';
import fs from 'fs';

const ERROR_LOG_FILE = './error_test_log.txt';
const WIN_LOG_FILE = './win_count_log.txt';

describe('자동차 경주 테스트 (실시간 로그 + 통계)', () => {

  beforeAll(() => {
    fs.writeFileSync(ERROR_LOG_FILE, '--- 에러 테스트 로그 ---\n');
    fs.writeFileSync(WIN_LOG_FILE, '--- 우승자 집계 로그 ---\n');
  });

  // =========================
  // 1️⃣ 임의 에러 입력 500회
  // =========================
  test('임의 에러 입력 500회 테스트 및 로그', () => {
    const carNameSamples = ['', 123, '자동차이름너무김', '차@123', 'a,a', 'a;b;c', Array(12).fill('a').join(',')];
    const tryCountSamples = ['', 'abc', '2.5', '0', '100', 123];

    for (let i = 0; i < 500; i++) {
      const randomCarInput = carNameSamples[Math.floor(Math.random() * carNameSamples.length)];
      try {
        InputValidator.validateCarNames(randomCarInput);
      } catch (error) {
        const msg = `CarName Test ${i + 1}: ${error.message}`;
        fs.appendFileSync(ERROR_LOG_FILE, msg + '\n');
      }

      const randomTryInput = tryCountSamples[Math.floor(Math.random() * tryCountSamples.length)];
      try {
        InputValidator.validateTryCount(randomTryInput);
      } catch (error) {
        const msg = `TryCount Test ${i + 1}: ${error.message}`;
        fs.appendFileSync(ERROR_LOG_FILE, msg + '\n');
      }
    }
  });

  // =========================
  // 2️⃣ 정상 입력 1000회 + 라운드 1~100 랜덤 + 통계 분석
  // =========================
  test('정상 입력값 1000회 테스트 및 우승 통계', () => {
    const cars = ['A', 'B', 'C'];
    const winCount = { A: 0, B: 0, C: 0 };
    const positionSums = { A: 0, B: 0, C: 0 };
    const totalGames = 1000;

    for (let i = 0; i < totalGames; i++) {
      const tryCount = Math.floor(Math.random() * 100) + 1; // 1~100 라운드
      const race = new Race(cars.join(','), tryCount);

      for (let j = 0; j < tryCount; j++) race.playRound();

      const winners = race.getWinners();
      winners.forEach(w => winCount[w]++);
      race.cars.forEach(c => positionSums[c.getName()] += c.getPosition());
    }

    // =========================
    // 우승 통계 기록
    // =========================
    fs.appendFileSync(WIN_LOG_FILE, '1000회 정상 입력 테스트 결과 (라운드 1~100 랜덤)\n');
    for (const [car, count] of Object.entries(winCount)) {
      const msg = `${car} 우승 횟수: ${count}`;
      fs.appendFileSync(WIN_LOG_FILE, msg + '\n');
    }

    // =========================
    // 통계 분석
    // =========================
    const winCounts = Object.values(winCount);
    const meanWins = winCounts.reduce((a, b) => a + b, 0) / winCounts.length;
    const maxWins = Math.max(...winCounts);
    const minWins = Math.min(...winCounts);
    const stdDev = Math.sqrt(winCounts.reduce((sum, x) => sum + Math.pow(x - meanWins, 2), 0) / winCounts.length);

    const winProb = {};
    for (const [car, count] of Object.entries(winCount)) {
      winProb[car] = ((count / totalGames) * 100).toFixed(2);
    }

    fs.appendFileSync(WIN_LOG_FILE, '\n===== 통계 분석 =====\n');
    fs.appendFileSync(WIN_LOG_FILE, `평균 우승 횟수: ${meanWins}\n`);
    fs.appendFileSync(WIN_LOG_FILE, `최대 우승 횟수: ${maxWins}\n`);
    fs.appendFileSync(WIN_LOG_FILE, `최소 우승 횟수: ${minWins}\n`);
    fs.appendFileSync(WIN_LOG_FILE, `표준편차: ${stdDev.toFixed(2)}\n`);
    for (const [car, prob] of Object.entries(winProb)) {
      fs.appendFileSync(WIN_LOG_FILE, `${car} 우승 확률: ${prob}%\n`);
    }

    // 평균 최종 위치
    for (const [car, sum] of Object.entries(positionSums)) {
      const avgPos = (sum / totalGames).toFixed(2);
      fs.appendFileSync(WIN_LOG_FILE, `${car} 평균 최종 위치: ${avgPos}\n`);
    }
  });
});