/**
 * Interface for classes that represent a Payment Gateway.
 *
 * @interface PaymentGateway
 */

/**
 * Payment gateway need payload config credential -> get from ShopBase
 *
 * @function
 * @param {Object} payload
 * @name PaymentGateway#constructor
 */

/**
 * Get order response represent data will submit to gateway
 * @function
 * @param {orderRequest} orderRequest
 * @name PaymentGateway#getDataCreateOrder
 * @returns {Promise<orderResponse>}
 */
