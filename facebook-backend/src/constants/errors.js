export const ERROR_MESSAGES = {
  // if you change below message ensure that in addeditProposal's(frontent) message is also changed #And012

  invalidEmailOrPassword: "Invalid email or password",
  uploadMaxSize: "Failed to upload the file. The max size of the file is 50 MB.",
  emailConnectedAnotherUser:
    "This email address is connected to another user. Please, change the email.",
  somethingWentWrong: "Something went wrong",
  invalidEmail: "Please enter a valid email",
  invalidData: "Invalid data",
  userNotFound: "No such user found",
  invalidPasswordId: "Please enter the correct code sent to your email.",
  emptyPasswordId: "Please enter the code",
  invalidPassword: "Email or password is incorrect. Please enter valid credentials.",
  userAlreadyExists: "A user with this email address already exists.",
  emailAlreadyExists: "This email is already used for another company account",
  unauthenticated: "Unauthenticated",
  invalidToken: "Invalid token",
  invalidUserId: "Invalid userId",
};
// this object must be the same here and in frontend *****************************************************
export const ERROR_CODES = {
  authorization: "FLASH_CO_AUTHORIZATION",
  authentication: "FLASH_CO_AUTHENTICATION",
  invalidData: "FLASH_CO_INVALID_DATA",
  permissionDenied: "FLASH_CO_PERMISSION_DENIED",
  invalidToken: "FLASH_CO_INVALID_TOKEN",
  somethingWentWrong: "FLASH_CO_SOMETHING_WENT_WRONG",
  invalidCredentials: "Please enter a valid credentials.",
};
