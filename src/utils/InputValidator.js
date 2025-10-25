import ErrorMessage from "./ErrorMessage.js";

class InputValidator {
  static validateCarNames(input) {
    if (!input || input.trim() === "") {
      throw new Error(ErrorMessage.EMPTY_INPUT);
    }

    const names = input.split(",").map((name) => name.trim());

    if (new Set(names).size !== names.length) {
      throw new Error(ErrorMessage.DUPLICATE_CAR_NAME);
    }

    names.forEach((name) => {
      if (name.length === 0 || name.length >= 4) {
        throw new Error(ErrorMessage.INVALID_CAR_NAME_LENGTH);
      }
    });
  }

  static validateTryCount(input) {
    if (!input || input.trim() === "") {
      throw new Error(ErrorMessage.EMPTY_INPUT);
    }

    const count = Number(input);

    if (isNaN(count)) {
      throw new Error(ErrorMessage.NOT_A_NUMBER);
    }

    if (count < 1) {
      throw new Error(ErrorMessage.INVALID_TRY_COUNT);
    }
  }
}

export default InputValidator;
