class ApiError extends Error {
  constructor(message = "An error occurred", statusCode = 500, errors = null) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export { ApiError }
