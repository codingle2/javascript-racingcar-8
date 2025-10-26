# javascript-racingcar-precourse

초간단 자동차 경주 게임 (Node.js)
## 🏁 프로젝트 개요

설계를 하고 프로젝트를 시작했습니다.  
주어진 자동차 이름들과 시도 횟수를 입력받아, 랜덤한 이동 결과를 출력하고 최종 우승자를 판별합니다.  
함수 분리, 단일 책임 원칙(SRP), 들여쓰기 depth 2 이하 등 프로그래밍 요구사항을 충실히 반영합니다.  
+ MVC 패턴 적용했습니다.  

📁 디렉토리 구조
```
📁 src
 ├── App.js
 ├── controller/
 │    └── GameController.js
 ├── model/
 │    ├── Car.js
 │    └── Race.js
 ├── view/
 │    ├── InputView.js
 │    └── OutputView.js
 ├── utils/
 │    ├── ErrorMessage.js
 │    ├── InputValidator.js
 │    └── RandomUtils.js
```

📘 MVC 개념 적용 요약
| 계층             | 역할                 | 파일                              |
| -------------- | ------------------ | ------------------------------- |
| **Model**      | 비즈니스 로직, 데이터 상태 관리 | `Car.js`, `Race.js`             |
| **View**       | 사용자 입출력 담당         | `InputView.js`, `OutputView.js` |
| **Controller** | 흐름 제어, 모델-뷰 연결     | `GameController.js`, `App.js`   |

## 🧭 기능 흐름 요약 및 MVC 패턴

1. 자동차 이름 입력  
   - 쉼표(,)로 구분  
   - 이름은 1~5자 이내  

2. 시도 횟수 입력  
   - 1 이상의 정수  

3. 매 시도마다 각 자동차는 랜덤 값(0~9)을 뽑음  
   - 4 이상일 경우 전진  

4. 모든 라운드 출력 후 최종 우승자 출력  
   - 여러 명일 경우 쉼표(,)로 구분

```
flowchart TD
  A[사용자 입력 (InputView)] --> B[컨트롤러 (GameController)]
  B --> C[모델 (Race, Car)\n비즈니스 로직 수행]
  C --> D[결과를 다시 View로 전달]
  D --> E[OutputView에서 콘솔 출력]
```


## ❗️ ERROR 메시지 목록
| 상황            | 메시지                                        |
| ------------- | ------------------------------------------ |
| 자동차 이름 미입력    | `[ERROR] 자동차 이름이 비어 있습니다.`                 |
| 자동차 이름이 6자 이상 | `[ERROR] 자동차 이름은 1~5자 사이여야 합니다.`           |
| 시도 횟수가 숫자가 아님 | `[ERROR] 시도 횟수는 1 이상의 숫자여야 합니다.`           |
| 중복 이름 존재      | `[ERROR] 중복된 자동차 이름이 존재합니다.`               |
| 잘못된 구분자 사용    | `[ERROR] 자동차 이름은 쉼표(,)로 구분되어야 합니다.`        |
| 허용되지 않은 문자 포함 | `[ERROR] 자동차 이름에는 한글, 영문, 숫자만 포함할 수 있습니다.` |
| 자동차 개수 초과     | `[ERROR] 자동차는 최대 10대까지만 등록할 수 있습니다.`       |
| 시도 횟수 1 미만    | `[ERROR] 시도 횟수는 1 이상이어야 합니다.`              |


⚠️ 예외 발생 시 프로그램은 즉시 종료되며, process.exit() 대신 예외 전파로 처리합니다.  

## 예외 처리 구조
```
try {
  // 입력, 실행, 출력 순서
} catch (error) {
  Console.print(`[ERROR] ${error.message}`);
}
```
Error 발생 시 프로그램은 종료되지만,  
process.exit()를 직접 호출하지 않습니다.  

## 🧪 테스트 (강화된 테스트 구조)
__tests__/RaceGameRealtime.test.js  
- 입력 검증 에러 케이스 500회 랜덤 테스트
- 정상 입력 1000회 테스트 + 통계 분석
- 경계값 테스트 (자동차 이름 1~5자, 시도 1~50회)
- Stress Test (자동차 1~10대, 1~100라운드)

## 로그 파일
| 파일명                  | 내용                |
| -------------------- | ----------------- |
| `error_test_log.txt` | 입력 검증 실패 케이스 로그   |
| `win_count_log.txt`  | 우승자 통계 및 확률 분석 결과 |  


## 테스트 결과 분석 예시  
- 평균 우승 횟수
- 최대/최소 우승 횟수
- 표준편차
- 동점 우승 발생 횟수
- 각 자동차별 평균 최종 위치, 최소/최대 위치


## 브랜치 전략 (기능 단위 구현 계획)
| 브랜치명                     | 역할            | 세부 내용                              |
| ------------------------ | ------------- | ---------------------------------- |
| `feature/mvc-setup`      | MVC 구조 세팅     | 디렉토리 구조, 기본 import/export 구성       |
| `feature/model`          | Model 구현      | `Car.js`, `Race.js` 작성             |
| `feature/view`           | View 구현       | `InputView.js`, `OutputView.js` 작성 |
| `feature/controller`     | Controller 구현 | `GameController.js` 작성             |
| `feature/validation`     | 입력 검증 추가      | `InputValidator.js` 작성             |
| `feature/error-handling` | 에러 메시지 일원화    | `[ERROR]` 형식 통일                    |
| `feature/test`           | test 구현       | `RaceGame.test.js` 작성             |

## 코드 컨벤션 준수 사항
- indent depth ≤ 2
- 3항 연산자 사용 금지
- 한 함수 = 한 가지 역할
- 변수명은 명확하고 의미 있게 작성 (carNames, tryCount, winners)
- 모든 콘솔 출력은 Console.print() 사용
- 랜덤 값은 반드시 Random.pickNumberInRange(0, 9) 사용


## 핵심 구현 포인트
1. 단일 책임 원칙 (SRP)  
   - 각 모듈은 한 가지 책임만 가진다.  
   - 예시: 입력(InputView), 검증(InputValidator), 출력(OutputView), 게임(Race)  

2. 함수 분리  
   - 들여쓰기 depth ≤ 2  
   - 조건문 중첩 대신 함수 호출로 구조 단순화  

3. 명확한 예외 처리 흐름  
   - `[ERROR]`로 시작하는 에러 메시지 통일  
   - 입력 단계에서 모든 검증 수행  


⚙️ 기술 스택
- 구분	사용 기술
- 언어	JavaScript
- 권장 실행 환경	Node.js 22.19.0
- 테스트	Jest
- 라이브러리	@woowacourse/mission-utils

반영 사항:
- process.exit() 사용 금지
- 외부 라이브러리 추가 금지
- package.json 수정 금지

🧪 테스트 실행  
npm test  

Jest 기반 단위 테스트를 수행합니다.  
@woowacourse/mission-utils의 Console 및 Random API는 mock을 이용해 테스트합니다.  

👤 개발자 이름: 이원형 프리코스 과제: 자동차 경주 (racingcar-precourse)
