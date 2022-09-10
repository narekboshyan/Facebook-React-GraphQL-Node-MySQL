import { ApolloError } from 'apollo-server-errors'
import { ERROR_CODES } from '../constants/errors.js'

export class SomethingWentWrongError extends ApolloError {
  constructor(message) {
    super(message, ERROR_CODES.somethingWentWrong)

    Object.defineProperty(this, 'name', { value: 'SomethingWentWrongError' })
  }
}
