const crypto = require('crypto');

/**
 @typedef signObject
 @type {Object}
 @property {string} orderNo
 @property {string} orderCurrency
 @property {string} orderAmount
 @property {string} returnUrl
 */


/**
 * @public
 * @function
 * @param {AsiaBillCredential} credential
 * @param {signObject} signObject
 * @return {string}
 */
function sign(credential, signObject) {
  // eslint-disable-next-line max-len
  const message = `${credential.merNo}${credential.gatewayNo}${signObject.orderNo}${signObject.orderCurrency}${signObject.orderAmount}${signObject.returnUrl}${credential.signKey}`;

  return crypto.createHash('sha256').update(message).digest('hex');
}

module.exports = sign;
