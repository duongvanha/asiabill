const StatusCodes = require('./statusCodes');
const {
  ERROR_CARD_DECLINED,
  ERROR_PROCESSING_ERROR,
  ERROR_CALLER_ISSUER,
  ERROR_PICK_UP_CARD,
  ERROR_INVALID_SIGNATURE,
  ERROR_ACCOUNT_RESTRICTED,
  ERROR_ACCOUNT_INVALID,
  ERROR_PAYMENT_NOT_SUPPORTED,
  ERROR_MISSING_PARAMS,
} = require('./errorCode');

const {
  RESULT_COMPLETED,
  RESULT_FAILED,
} = require('./result');


const {
  TRANSACTION_TYPE_AUTHORIZATION,
  TRANSACTION_TYPE_CAPTURE,
  TRANSACTION_TYPE_REFUND,
  TRANSACTION_TYPE_VOID,
} = require('./transaction');

module.exports = {
  ERROR_CARD_DECLINED,
  ERROR_PROCESSING_ERROR,
  ERROR_CALLER_ISSUER,
  ERROR_PICK_UP_CARD,
  ERROR_INVALID_SIGNATURE,
  ERROR_ACCOUNT_RESTRICTED,
  ERROR_ACCOUNT_INVALID,
  ERROR_PAYMENT_NOT_SUPPORTED,
  ERROR_MISSING_PARAMS,

  RESULT_COMPLETED,
  RESULT_FAILED,

  StatusCodes,

  TRANSACTION_TYPE_AUTHORIZATION,
  TRANSACTION_TYPE_CAPTURE,
  TRANSACTION_TYPE_REFUND,
  TRANSACTION_TYPE_VOID,
};
