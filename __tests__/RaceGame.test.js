// __tests__/RaceGameRealtime.test.js
import InputValidator from '../src/utils/InputValidator.js';
import { Race } from '../src/model/Race.js';
import fs from 'fs';

const ERROR_LOG_FILE = './error_test_log.txt';
const WIN_LOG_FILE = './win_count_log.txt';

describe('자동차 경주 테스트 (강화)', () => {
  beforeAll(() => {
    fs.writeFileSync(ERROR_LOG_FILE, '--- 에러 테스트 로그 ---\n');
    fs.writeFileSync(WIN_LOG_FILE, '--- 우승자 집계 로그 ---\n');
  });

  //1. 검증 에러 케이스 테스트
  test('자동차 이름 / 시도 횟수 입력 검증 에러 테스트', () => {
    const carNameSamples = [
      '', '   ', '자동차이름너무김', '차@123', 'a,a', 'a;b;c',
      Array(12).fill('a').join(','), 'A,,B', 'A B,C', 'A,A,B'
    ];
    const tryCountSamples = ['', 'abc', '2.5', '0', '100', -5, '51', 'NaN'];

    for (let i = 0; i < 500; i++) {
      const randomCarInput = carNameSamples[Math.floor(Math.random() * carNameSamples.length)];
      try {
        InputValidator.validateCarNames(randomCarInput);
      } catch (error) {
        fs.appendFileSync(ERROR_LOG_FILE, `CarName Test ${i + 1}: ${error.message}\n`);
      }

      const randomTryInput = tryCountSamples[Math.floor(Math.random() * tryCountSamples.length)];
      try {
        InputValidator.validateTryCount(randomTryInput);
      } catch (error) {
        fs.appendFileSync(ERROR_LOG_FILE, `TryCount Test ${i + 1}: ${error.message}\n`);
      }
    }
  });

  //2. 정상 입력값 1000회 테스트 + 통계 분석 강화
  test('정상 입력값 테스트 및 통계 분석', () => {
    const cars = ['A', 'B', 'C'];
    const totalGames = 1000;
    const winCount = {};
    const positionSums = {};
    const positionHistory = {};
    const tieCount = { total: 0 };

    cars.forEach(car => { 
      winCount[car] = 0;
      positionSums[car] = 0;
      positionHistory[car] = [];
    });

    for (let i = 0; i < totalGames; i++) {
      const tryCount = Math.floor(Math.random() * 100) + 1; // 1~100 라운드
      const race = new Race(cars.join(','), tryCount);

      for (let j = 0; j < tryCount; j++) race.playRound();

      const winners = race.getWinners();
      if (winners.length > 1) tieCount.total++;
      winners.forEach(w => winCount[w]++);
      race.cars.forEach(c => {
        const name = c.getName();
        positionSums[name] += c.getPosition();
        positionHistory[name].push(c.getPosition());
      });
    }

    //우승 통계 기록
    fs.appendFileSync(WIN_LOG_FILE, `1000회 정상 입력 테스트 결과 (라운드 1~100 랜덤)\n`);
    for (const [car, count] of Object.entries(winCount)) {
      fs.appendFileSync(WIN_LOG_FILE, `${car} 우승 횟수: ${count}\n`);
    }

    //통계 분석
    const winValues = Object.values(winCount);
    const meanWins = winValues.reduce((a,b)=>a+b,0)/winValues.length;
    const maxWins = Math.max(...winValues);
    const minWins = Math.min(...winValues);
    const stdDev = Math.sqrt(winValues.reduce((sum, x)=>sum+Math.pow(x-meanWins,2),0)/winValues.length);

    const winProb = {};
    for (const [car, count] of Object.entries(winCount)) {
      winProb[car] = ((count / totalGames) * 100).toFixed(2);
    }

    fs.appendFileSync(WIN_LOG_FILE, '\n===== 통계 분석 =====\n');
    fs.appendFileSync(WIN_LOG_FILE, `평균 우승 횟수: ${meanWins}\n`);
    fs.appendFileSync(WIN_LOG_FILE, `최대 우승 횟수: ${maxWins}\n`);
    fs.appendFileSync(WIN_LOG_FILE, `최소 우승 횟수: ${minWins}\n`);
    fs.appendFileSync(WIN_LOG_FILE, `표준편차: ${stdDev.toFixed(2)}\n`);
    fs.appendFileSync(WIN_LOG_FILE, `동점 우승 발생 횟수: ${tieCount.total}\n`);
    for (const [car, prob] of Object.entries(winProb)) {
      fs.appendFileSync(WIN_LOG_FILE, `${car} 우승 확률: ${prob}%\n`);
    }

    // 평균 최종 위치 + 분포
    for (const [car, sum] of Object.entries(positionSums)) {
      const avgPos = (sum / totalGames).toFixed(2);
      const positions = positionHistory[car];
      const minPos = Math.min(...positions);
      const maxPos = Math.max(...positions);
      fs.appendFileSync(WIN_LOG_FILE, `${car} 평균 최종 위치: ${avgPos}, 최소: ${minPos}, 최대: ${maxPos}\n`);
    }
  });

  //3. 경계값 테스트
  test('경계값 테스트 (자동차 이름 길이 1~5, tryCount 1~50)', () => {
    const nameTests = ['A','AB','ABC','ABCD'];
    nameTests.forEach(name=>{
      expect(InputValidator.validateCarNames(name+','+name+'2')).toEqual([name, name+'2']);
    });

    const tryTests = ['1','50','25'];
    tryTests.forEach(tc=>{
      const count = InputValidator.validateTryCount(tc);
      expect(count).toBe(Number(tc));
    });
  });

  //4. Stress Test (자동차 1~10, 라운드 1~100)
  test('Stress Test: 자동차 수 1~10, 라운드 1~100', () => {
    for(let carCount=1; carCount<=10; carCount++){
      const cars = Array.from({length:carCount},(_,i)=>String.fromCharCode(65+i));
      for(let game=0; game<50; game++){
        const tryCount = Math.floor(Math.random()*100)+1;
        const race = new Race(cars.join(','), tryCount);
        for(let i=0;i<tryCount;i++) race.playRound();
        const winners = race.getWinners();
        expect(winners.length).toBeGreaterThanOrEqual(1);
      }
    }
  });
});
