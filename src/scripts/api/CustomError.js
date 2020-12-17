export default class CustomError {
    constructor(errorCode, message, status = 450, details = []) {
        this.errorCode = errorCode;
        this.message = message;
        this.stauts = status;
        this.details = details;
    }
}

export const ErrorCodes = {
    BALANCE_NOT_A_NUMBER: 450001,
    TOPUP_AMOUNT_NOT_A_NUMBER: 450002,
    WITHDRAW_AMOUNT_NOT_A_NUMBER: 450003
};
