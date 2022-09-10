import { ApolloError } from 'apollo-server-errors'
import { ERROR_CODES } from '../constants/errors.js'

export class AuthorizationError extends ApolloError {
  constructor(message) {
    super(message, ERROR_CODES.authorization)

    Object.defineProperty(this, 'name', { value: 'AuthorizationError' })
  }
}
