/**
 * @public
 * @function
 * @param {AsiaBillCredential} credential
 * @param {redirectRequest} redirectRequest
 * @param {string} signKey
 * @return {string}
 */
async function sign(credential,
    redirectRequest, signKey) {
  const message = credential.merNo + credential.gatewayNo +
    redirectRequest.data.orderNo + redirectRequest.data.orderCurrency +
    redirectRequest.data.orderAmount + redirectRequest.data.returnUrl +
    signKey;
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  return hashArray.map((b) => ('00' + b.toString(16)).slice(-2)).join('');
}

module.exports = sign;
