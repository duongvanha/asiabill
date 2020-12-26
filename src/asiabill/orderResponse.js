const Joi = require('joi');

const schemaOrderResponse = Joi.object().keys({
  orderAmount: Joi.number().max(1000000000).required(),
  orderCurrency: Joi.string().max(3).required(),
  orderNo: Joi.string().max(50).required(),
  tradeNo: Joi.string().max(200).required(),
  remark: Joi.string().max(200).required(),
  orderInfo: Joi.string().max(200).required(),
  orderStatus: Joi.number().required(),
  signInfo: Joi.string().required(),
});


module.exports = schemaOrderResponse;
