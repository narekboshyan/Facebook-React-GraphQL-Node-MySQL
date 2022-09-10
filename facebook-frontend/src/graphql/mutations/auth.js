import { gql } from '@apollo/client';

export const EMAIL_CONFIRMATION = gql`
  mutation emailConfirmation($confirmationCode: Int!) {
    emailConfirmation(confirmationCode: $confirmationCode)
  }
`;

export const RECOVER_PASSWORD = gql`
  mutation recoverPassword($email: String) {
    recoverPassword(email: $email)
  }
`;

export const CONFIRM_CODE = gql`
  mutation confirmCode($confirmationCode: Int!) {
    confirmCode(confirmationCode: $confirmationCode)
  }
`;
export const TWO_FACTOR_AUTH = gql`
  mutation twoFactorAuthentication($confirmationCode: String!) {
    twoFactorAuthentication(confirmationCode: $confirmationCode) {
      id
      firstName
      token
      role
      confirmed
      lastName
      email
      permissions {
        canReadUsers
        canUpdateUser
        canDeleteUser
        canCreateUser
      }
      companyUsersData {
        id
        value
        companyName
        permissions {
          canReadOrders
          canReadQuotes
          canReadInvoices
        }
      }
    }
  }
`;

export const SET_PASSWORD = gql`
  mutation setPassword($password: String!) {
    setPassword(password: $password)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($confirmationCode: Int, $password: String) {
    changePassword(confirmationCode: $confirmationCode, password: $password)
  }
`;

export const SIGN_UP = gql`
  mutation signup($signupData: signupData) {
    signup(signupData: $signupData)
  }
`;

export const SIGN_IN = gql`
  mutation signin($signInData: signInData!) {
    signin(signInData: signInData) {
      id
      firstName
      lastName
      email
      token
      roleId
      confirmed
    }
  }
`;
