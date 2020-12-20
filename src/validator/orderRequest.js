const Joi = require('joi');

const schemaAddress = Joi.object({
  phone: Joi.string().max(50).required(),
  // form.append('phone', orderRequest.billingAddress.phone);
  // form.append('country', orderRequest.billingAddress.country);
  // form.append('state', orderRequest.billingAddress.state);
  // form.append('city', orderRequest.billingAddress.city);
  // form.append('address', orderRequest.billingAddress.line1);
  // form.append('zip', orderRequest.billingAddress.postal_code);
});

const schemaOrderRequest = Joi.object({
      currency: Joi.string().max(3).required(),

      amount: Joi.string().max(10).required(),

      firstName: Joi.string().max(100).required(),
      lastName: Joi.string().max(50).required(),

      email: Joi.string().max(200).required(),

      shippingAddress: schemaAddress,

      // form.append('orderCurrency', orderRequest.currency);
      // form.append('orderAmount', orderRequest.amount);
      form.append('returnUrl', 'my value');
      form.append('callbackUrl', 'my value');
      // form.append('isMobile', 'my value');
      // form.append('interfaceInfo', 'my value');
      form.append('goods_detail', 'my value');
      form.append('signInfo', 'my value');
      // form.append('remark', 'my value');
      // form.append('paymentMethod', PaymentMethod);
      // form.append('firstName', orderRequest.firstName);
      // form.append('lastName', orderRequest.lastName);
      // form.append('email', orderRequest.email);
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
      form.append('shipZip', orderRequest.shippingAddress.postal_code),;

    })
;

module.exports = schemaOrderRequest;
