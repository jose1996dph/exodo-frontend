const isServerException = (object: any): boolean => {
  return 'statusCode' in object && 'message' in object && 'error' in object
}

export { isServerException }

export default interface ServerException {
  statusCode: number
  message: string | string[]
  error: string
}

export interface ServiceException {
  response: { data: ServerException }
}
