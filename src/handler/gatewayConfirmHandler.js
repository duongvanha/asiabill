const Joi = require('joi');

// should using factory return interface
const PaymentGateway = require('../asiabill/PaymentGateway');

const redis = require('../lib/redis');
const CredentialManager = require('../lib/CredentialManager');
const UrlManager = require('../lib/UrlManager');
const logger = require('../lib/logger');
const StatusCodes = require('../constants/statusCodes');
const SignInvalidError = require('../errors/SignInvalid');
const {redirectWithSignRequestToShopBase} = require('../lib/ResponseHelper');
const {
  ERROR_PROCESSING_ERROR,
  ERROR_INVALID_SIGNATURE,
  ERROR_MISSING_PARAMS,
  RESULT_FAILED,
} = require('../constants');

const creManager = new CredentialManager(redis);
const urlManager = new UrlManager(redis);

/**
 * @param {Express.request} req
 * @param {Express.response} res
 * @return {Promise<*>}
 */
async function gatewayConfirmHandler(req, res) {
  const paymentGateway = new PaymentGateway();
  let ref;
  let isPostPurchase;
  let urlObject;

  try {
    ref = paymentGateway.getRefFromResponseGateway(req.body);
    isPostPurchase = paymentGateway.isPostPurchase(req.body);
    urlObject = await urlManager.getUrlObject(ref, isPostPurchase);
    const accountId = paymentGateway.getAccountIdFromResponseGateway(req.body);
    const credential = await creManager.getById(accountId);
    paymentGateway.setCredential(credential);
    const orderResponse = await paymentGateway.getOrderResponse(req.body);

    if (orderResponse.isCancel) {
      return res.redirect(urlObject.cancelUrl);
    }

    return redirectWithSignRequestToShopBase(
        res,
        urlObject.returnUrl,
        orderResponse,
    );
  } catch (e) {
    if (!urlObject) {
      // system error cannot get url object -> block checkout buyer urgent
      logger.error(e);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('system error');
    }
    if (e instanceof Joi.ValidationError) {
      return redirectWithSignRequestToShopBase(res, urlObject.returnUrl, {
        x_result: RESULT_FAILED,
        x_message: e.message,
        x_error_code: ERROR_MISSING_PARAMS,
      });
    }

    if (e instanceof SignInvalidError) {
      logger.warn(e);
      return redirectWithSignRequestToShopBase(res, urlObject.returnUrl, {
        x_result: RESULT_FAILED,
        x_message: e.message,
        x_error_code: ERROR_INVALID_SIGNATURE,
      });
    }

    // system or unexpected error need call alert
    logger.error(e);
    return redirectWithSignRequestToShopBase(res, urlObject.returnUrl, {
      x_result: RESULT_FAILED,
      x_message: e.message,
      x_error_code: ERROR_PROCESSING_ERROR,
    });
  }
}

module.exports = gatewayConfirmHandler;
