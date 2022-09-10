import { ApolloError } from 'apollo-server-errors'
import { ERROR_CODES } from '../constants/errors.js'

export class PermissionDeniedError extends ApolloError {
  constructor(message) {
    super(message, ERROR_CODES.permissionDenied)

    Object.defineProperty(this, 'name', { value: 'PermissionDeniedError' })
  }
}
