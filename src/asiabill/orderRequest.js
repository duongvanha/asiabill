const Joi = require('joi');

const schemaAddress = Joi.object({
  phone: Joi.string().max(50).required(),
  country: Joi.string().max(100).required(),
  state: Joi.string().max(100).required(),
  city: Joi.string().max(100).required(),
  line1: Joi.string().max(500).required(),
  postal_code: Joi.string().max(100).required(),
});

const schemaOrderRequest = Joi.object().keys({
  currency: Joi.string().max(3).required(),
  amount: Joi.number().max(1000000000).required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(50).required(),
  email: Joi.string().max(200).required(),

  shippingAddress: schemaAddress.required(),
  billingAddress: schemaAddress.required(),

  // form.append('isMobile', 'my value');
  // form.append('interfaceInfo', 'my value');
  // form.append('remark', 'my value');
  // form.append('paymentMethod', PaymentMethod);

  // form.append('returnUrl', 'my value');
  // form.append('callbackUrl', 'my value');
  // form.append('goods_detail', 'my value');
  // form.append('signInfo', 'my value');
});

module.exports = schemaOrderRequest;
