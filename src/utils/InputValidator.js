import ErrorMessage from "./ErrorMessage.js";

class InputValidator {
    //자동차 이름 입력 검증
    static validateCarNames(input) {
        //타입 확인
        if (typeof input !== "string") {
            throw new Error(ErrorMessage.INVALID_TYPE);
        }

        //공백 입력
        if (!input || input.trim() === "") {
            throw new Error(ErrorMessage.EMPTY_INPUT);
        }

        //구분자 확인 (,가 없거나 이상한 구분자)
        if (!input.includes(",")) {
            throw new Error(ErrorMessage.INVALID_SEPARATOR);
        }

        const names = input
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0);

        //빈 이름 (예: "a,,b" 같은 입력)
        if (names.length === 0) {
            throw new Error(ErrorMessage.EMPTY_INPUT);
        }

        //중복된 이름
        if (new Set(names).size !== names.length) {
            throw new Error(ErrorMessage.DUPLICATE_CAR_NAME);
        }

        //개수 제한 (예: 100대 이상 방지)
        if (names.length > 10) {
            throw new Error(ErrorMessage.TOO_MANY_CARS);
        }

        //각 이름별 세부 검사
        names.forEach(name => {
            // 길이 제한
            if (name.length === 0 || name.length > 5) throw new Error(ErrorMessage.INVALID_CAR_NAME_LENGTH);
            //허용 문자: 한글, 영문, 숫자만
            if (!/^[가-힣a-zA-Z0-9]+$/.test(name)) throw new Error(ErrorMessage.INVALID_CHARACTER);
        });
        return names;
    }

   //시도 횟수 입력 검증
    static validateTryCount(input) {
        if (typeof input !== "string") {
            throw new Error(ErrorMessage.INVALID_TYPE);
        }

        if (!input || input.trim() === "") {
            throw new Error(ErrorMessage.EMPTY_INPUT);
        }

        const count = Number(input);

        if (isNaN(count)) {
            throw new Error(ErrorMessage.NOT_A_NUMBER);
        }

        if (!Number.isInteger(count)) {
            throw new Error(ErrorMessage.NOT_AN_INTEGER);
        }

        if (count < 1) {
            throw new Error(ErrorMessage.NON_POSITIVE_TRY_COUNT);
        }
        
        if (count > 50) {
        //상한선: 비정상적으로 큰 입력 방지
            throw new Error(ErrorMessage.INVALID_TRY_COUNT);
        }
        return count;
    }
}

export default InputValidator;