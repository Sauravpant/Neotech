export class AppError extends Error {
  statusCode: number;
  message: string;
  errors: any[];
  success: boolean;
  data: null;

  constructor(statusCode: number, message: string = "Something went wrong", errors: any[] = [], stack: string = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
