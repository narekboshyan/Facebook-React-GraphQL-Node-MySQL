import { ApolloError } from 'apollo-server-errors'
import { ERROR_CODES } from '../constants/errors.js'

export class InvalidDataError extends ApolloError {
  constructor(message) {
    super(message, ERROR_CODES.invalidData)

    Object.defineProperty(this, 'name', { value: 'InvalidDataError' })
  }
}
