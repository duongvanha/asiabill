const querystring = require('querystring');

/**
 * @param {Express.response} res
 * @param {string} url
 * @param {Object} body
 * @return {*}
 */
function redirectWithSignRequestToShopBase(res, url, body) {
  return res.redirect(`${url}?${querystring.stringify(body)}`);
}

module.exports = {redirectWithSignRequestToShopBase};
