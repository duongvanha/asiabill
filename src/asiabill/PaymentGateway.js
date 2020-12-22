const schemaOrderRequest = require('./orderRequest');
const schemaCredential = require('./credential');
const {UrlLiveMore, UrlTestMode, PaymentMethod} = require('./constant');

/**
 * Class representing a AsianBill gateway.
 *
 * @class
 * @implements {PaymentGateway}
 */
class AsiaBillPaymentGateway {
  /**
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
   * @param {orderRequest} orderRequest
   * @return {Promise<orderResponse>}
   */
  async getDataCreateOrder(orderRequest) {
    const orderRequestValidated = await schemaOrderRequest.validateAsync(
        orderRequest, {
          allowUnknown: true,
        },
    );

    return {
      data: {
        merNo: this.payload.merNo,
        gatewayNo: this.payload.gatewayNo,
        // orderNo: 'my value',
        orderCurrency: orderRequestValidated.currency,
        orderAmount: orderRequestValidated.amount,
        returnUrl: 'my value',
        callbackUrl: 'my value',
        // isMobile: 'my value',
        // interfaceInfo: 'my value',
        goods_detail: 'my value',
        signInfo: 'my value',
        // remark: 'my value',
        paymentMethod: PaymentMethod,
        firstName: orderRequestValidated.firstName,
        lastName: orderRequestValidated.lastName,
        email: orderRequestValidated.email,
        phone: orderRequestValidated.billingAddress.phone,
        country: orderRequestValidated.billingAddress.country,
        state: orderRequestValidated.billingAddress.state,
        city: orderRequestValidated.billingAddress.city,
        address: orderRequestValidated.billingAddress.line1,
        zip: orderRequestValidated.billingAddress.postal_code,
        shipFirstName: orderRequestValidated.firstName,
        shipLastName: orderRequestValidated.lastName,
        shipPhone: orderRequestValidated.shippingAddress.phone,
        shipCountry: orderRequestValidated.shippingAddress.country,
        shipState: orderRequestValidated.shippingAddress.state,
        shipCity: orderRequestValidated.shippingAddress.city,
        shipAddress: orderRequestValidated.shippingAddress.line1,
        shipZip: orderRequestValidated.shippingAddress.postal_code,
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
      return UrlTestMode;
    }

    return UrlLiveMore;
  }
}

module.exports = AsiaBillPaymentGateway;
