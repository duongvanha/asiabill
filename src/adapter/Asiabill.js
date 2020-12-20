const axios = require('axios');
const FormData = require('form-data');

const {
  UrlLiveMore,
  UrlTestMode,
  PaymentMethod,
} = require('../constants/asiaBill');

/**
 * Class representing a AsianBill gateway.
 *
 * @class
 * @implements {PaymentGateway}
 */
class AsiaBill {
  /**
   * @function
   * @param {paymentGatewayPayload} payload
   */
  constructor(payload) {
    this.payload = payload;
  }

  /**
   * @public
   * @param {orderRequest} orderRequest
   * @return {Promise<orderResponse>}
   */
  async createOrder(orderRequest) {
    // todo validate order request
    const form = new FormData();
    form.append('merNo', this.payload.merNo);
    form.append('gatewayNo', this.payload.gatewayNo);
    // form.append('orderNo', 'my value');
    form.append('orderCurrency', orderRequest.currency);
    form.append('orderAmount', orderRequest.amount);
    form.append('returnUrl', 'my value');
    form.append('callbackUrl', 'my value');
    // form.append('isMobile', 'my value');
    // form.append('interfaceInfo', 'my value');
    form.append('goods_detail', 'my value');
    form.append('signInfo', 'my value');
    // form.append('remark', 'my value');
    form.append('paymentMethod', PaymentMethod);
    form.append('firstName', orderRequest.firstName);
    form.append('lastName', orderRequest.lastName);
    form.append('email', orderRequest.email);
    form.append('phone', orderRequest.billingAddress.phone);
    form.append('country', orderRequest.billingAddress.country);
    form.append('state', orderRequest.billingAddress.state);
    form.append('city', orderRequest.billingAddress.city);
    form.append('address', orderRequest.billingAddress.line1);
    form.append('zip', orderRequest.billingAddress.postal_code);
    form.append('shipFirstName', orderRequest.firstName);
    form.append('shipLastName', orderRequest.lastName);
    form.append('shipPhone', orderRequest.shippingAddress.phone);
    form.append('shipCountry', orderRequest.shippingAddress.country);
    form.append('shipState', orderRequest.shippingAddress.state);
    form.append('shipCity', orderRequest.shippingAddress.city);
    form.append('shipAddress', orderRequest.shippingAddress.line1);
    form.append('shipZip', orderRequest.shippingAddress.postal_code);
    return axios.post(this.urlApi, form, {
      headers: form.getHeaders(),
    }).then(() => ({url: ''}));
  }

  /**
   * @private
   * @return {string}
   */
  get urlApi() {
    if (this.payload.isTestMode) {
      return UrlTestMode;
    }

    return UrlLiveMore;
  }
}

module.exports = AsiaBill;
