const schemaOrderRequest = require('./orderRequest');
const schemaCredential = require('./credential');
const sign = require('./signHelper');
const {
  URL_LIVE_MODE,
  URL_TEST_MODE,
  PAYMENT_METHOD,
  INTERFACE_INFO,
} = require('./constant');

/**
 * Class representing a AsianBill gateway.
 *
 * @class
 * @implements {PaymentGateway}
 */
class AsiaBillPaymentGateway {
  /**
   * @throws {Joi.ValidationError} will throw when validate fail
   * @function
   * @param {AsiaBillCredential} payload
   */
  constructor(payload) {
    const result = schemaCredential.validate(payload);
    if (result.error) {
      throw result.error;
    }
    this.payload = payload;
  }

  /**
   * @public
   * @throws {Joi.ValidationError} will throw when validate fail
   * @param {orderRequest} orderRequest
   * @return {Promise<redirectRequest>}
   */
  async getDataCreateOrder(orderRequest) {
    const orderReqValid = await schemaOrderRequest.validateAsync(
        orderRequest, {
          allowUnknown: true,
        },
    );

    return {
      data: {
        merNo: this.payload.merNo,
        gatewayNo: this.payload.gatewayNo,
        orderNo: orderRequest.reference,
        orderCurrency: orderReqValid.currency,
        orderAmount: orderReqValid.amount,
        returnUrl: orderReqValid.returnUrl,
        callbackUrl: orderReqValid.callbackUrl,
        interfaceInfo: INTERFACE_INFO,
        signInfo: await sign(this.payload, orderReqValid, this.payload.signKey),
        paymentMethod: PAYMENT_METHOD,
        firstName: orderReqValid.firstName,
        lastName: orderReqValid.lastName,
        email: orderReqValid.email,
        phone: orderReqValid.billingAddress.phone,
        country: orderReqValid.billingAddress.country,
        state: orderReqValid.billingAddress.state,
        city: orderReqValid.billingAddress.city,
        address: orderReqValid.billingAddress.line1,
        zip: orderReqValid.billingAddress.postal_code,
        shipFirstName: orderReqValid.firstName,
        shipLastName: orderReqValid.lastName,
        shipPhone: orderReqValid.shippingAddress.phone,
        shipCountry: orderReqValid.shippingAddress.country,
        shipState: orderReqValid.shippingAddress.state,
        shipCity: orderReqValid.shippingAddress.city,
        shipAddress: orderReqValid.shippingAddress.line1,
        shipZip: orderReqValid.shippingAddress.postal_code,
      },
      url: this.urlApi,
    };
  }

  /**
   * @private
   * @return {string}
   */
  get urlApi() {
    if (this.payload.isTestMode) {
      return URL_TEST_MODE;
    }

    return URL_LIVE_MODE;
  }
}

module.exports = AsiaBillPaymentGateway;
