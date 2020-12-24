/**
 * Card declined by any reasons (anti-fraud, declined by bank..)
 * @type {string}
 */
const ERROR_CARD_DECLINED = 'authorization';
/**
 * An error occurred while processing the card.
 * Try again later or with a different payment method.
 * @type {string}
 */
const ERROR_PROCESSING_ERROR = 'capture';
/**
 * The card has been declined for an unknown reason.
 * The customer needs to contact their card issuer for more information.
 * @type {string}
 */
const ERROR_CALLER_ISSUER = 'refund';
/**
 * The customer's card issuer has declined the transaction and requested that
 * the card be retained as the card may have been reported as lost or stolen
 * @type {string}
 */
const ERROR_PICK_UP_CARD = 'void';
/**
 * @type {string}
 */
const ERROR_INVALID_SIGNATURE = 'void';
/**
 * @type {string}
 */
const ERROR_ACCOUNT_RESTRICTED = 'void';
/**
 * @type {string}
 */
const ERROR_ACCOUNT_INVALID = 'void';
/**
 * @type {string}
 */
const ERROR_PAYMENT_NOT_SUPPORTED = 'void';
/**
 * Missing "x" params
 * @type {string}
 */
const ERROR_MISSING_PARAMS = 'void';

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
};
