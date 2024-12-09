class ApiResponse {
  constructor(data = {}, statusCode = 200, message = "success") {
    this.success = statusCode < 400;
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ApiResponse;
