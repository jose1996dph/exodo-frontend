export class RequestException extends Error {
  constructor(statusCode: number, message: string) {
    super(message)
  }
}
