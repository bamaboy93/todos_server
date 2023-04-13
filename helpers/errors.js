class MainError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends MainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends MainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends MainError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  MainError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
};
