/**
 * config credential
 @typedef AsiaBillCredential
 @type {Object}
 @property {boolean} isTestMode
 @property {string} merNo
 @property {string} gatewayNo
 @property {string} signKey
 */

const Joi = require('joi');

const schemaCredential = Joi.object({
  isTestMode: Joi.bool(),
  merNo: Joi.string().max(5).required(),
  gatewayNo: Joi.string().max(8).required(),
  signKey: Joi.string().max(100).required(),
});

module.exports = schemaCredential;
