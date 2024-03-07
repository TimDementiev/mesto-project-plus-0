import { BAD_REQUEST, NOT_FOUND } from '../constants/errors';

class Errors extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest() {
    return new Errors(BAD_REQUEST.code, BAD_REQUEST.message);
  }

  static notFound() {
    return new Errors(NOT_FOUND.code, NOT_FOUND.message);
  }
}

export default Errors;