class ApiResponse {
  constructor(data = null, message = "Success", statusCode = 200) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
