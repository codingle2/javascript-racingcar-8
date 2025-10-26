const ErrorMessage = Object.freeze({
    EMPTY_INPUT: "[ERROR] 입력값이 비어 있습니다.",
    INVALID_TYPE: "[ERROR] 입력값은 문자열이어야 합니다.",
    INVALID_CAR_NAME_LENGTH: "[ERROR] 자동차 이름은 1자 이상 5자 이하만 가능합니다.",
    INVALID_TRY_COUNT: "[ERROR] 시도 횟수는 1 이상의 정수여야 합니다.",
    NOT_A_NUMBER: "[ERROR] 시도 횟수는 숫자여야 합니다.",
    NOT_AN_INTEGER: "[ERROR] 시도 횟수는 정수여야 합니다.",
    DUPLICATE_CAR_NAME: "[ERROR] 중복된 자동차 이름이 존재합니다.",
    INVALID_SEPARATOR: "[ERROR] 자동차 이름은 쉼표(,)로 구분되어야 합니다.",
    INVALID_CHARACTER: "[ERROR] 자동차 이름에는 한글, 영문, 숫자만 포함할 수 있습니다.",
    TOO_MANY_CARS: "[ERROR] 자동차는 최대 10대까지만 등록할 수 있습니다.",
    NON_POSITIVE_TRY_COUNT: "[ERROR] 시도 횟수는 1 이상이어야 합니다.",
    NON_MOVED_CAR: "[ERROR] 최소 한 번은 이동한 자동차가 있어야 합니다.",
});

export default ErrorMessage;
