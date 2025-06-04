class ApiError {
  constructor(message = "An error occurred", statusCode = 500, errors = null) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}
