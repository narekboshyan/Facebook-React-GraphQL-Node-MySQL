import { ApolloError } from "apollo-server-errors";
import { ERROR_CODES } from "../constants/errors.js";

export class InvalidUserData extends ApolloError {
  constructor(message) {
    super(message, ERROR_CODES.authentication);

    Object.defineProperty(this, "name", { value: "InvalidUserData" });
  }
}
