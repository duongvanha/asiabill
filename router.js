const express = require('express');
const Joi = require('joi');
const router = new express.Router();

const {
  ERROR_MISSING_PARAMS,
  ERROR_PROCESSING_ERROR,
  RESULT_FAILED,
  StatusCodes,
} = require('./src/constants');

// should using factory return interface
const PaymentGateway = require('./src/asiabill/PaymentGateway');

const parseOrderRequest = require('./src/parser/redirect');
const redis = require('./src/lib/redis');
const CredentialManager = require('./src/lib/CredentialManager');

const creManager = new CredentialManager(redis);

router.post('/create-order', async function(req, res) {
  try {
    const orderReq = await parseOrderRequest(res.body);
    const credential = await creManager.getById(orderReq.accountId);
    const paymentGateway = new PaymentGateway(credential);
    const redirectOrder = await paymentGateway.getDataCreateOrder(orderReq);
    return res.render('redirect', redirectOrder);
  } catch (e) {
    if (e instanceof Joi.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        x_result: RESULT_FAILED,
        x_message: e.message,
        x_error_code: ERROR_MISSING_PARAMS,
      });
    }

    // TODO handler error type

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      x_result: RESULT_FAILED,
      x_message: e.message,
      x_error_code: ERROR_PROCESSING_ERROR,
    });
  }
});

module.exports = router;
