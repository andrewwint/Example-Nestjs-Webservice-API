/**
 * @description Utility class to encapsulate a response;
 * the main purpose of this class is to encapsulate
 * the "getting"/reading of a response to one
 * place/module -- this module -- given that the
 * API is different depending on success or failure;
 * if the API was the same for both cases, then this
 * would would not be needed
 */
export default class XmlFileUploadResponse {
  constructor(response) {
    this.response = response;
  }

  /**
   * @description Method used for reading
   * the message within a response, since
   * the API is different for success and errors
   * @returns {String}
   */
  get message() {
    return this.wasSuccess ? this.response.data : this.response.data.error;
  }

  /**
   * @description Method used for checking
   * different places within the response object;
   * this is really needed since, for failures,
   * the data is an object, as opposed to
   * successess, data is a string
   * @returns {Boolean}
   */
  get wasSuccess() {
    return this.response.data.status === 400 ? false : true;
  }
}