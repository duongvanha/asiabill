/**
 * Credential storage manager
 * Handler cache strategy and logic get credential from ShopBase
 */
class CredentialManager {
  /**
   *
   * @param {Storage} storage
   */
  constructor(storage) {
    this.redis = storage;
  }

  /**
   * @public
   * @param {number} id
   * @return {Promise<*>}
   */
  getById(id) {
    // return this.storage.get(this.getCacheKeyById(id)).then((res) => {
    //   console.log(res);
    // });
    return Promise.resolve({
      gatewayNo: '10000007',
      merNo: '10000',
      isTestMode: true,
      signKey: '12345678',
    });
  }

  /**
   * @private
   * @param {number} id
   * @return {string}
   */
  getCacheKeyById(id) {
    return `${process.env.CACHE_KEY}/${id}`;
  }
}


module.exports = CredentialManager;
