import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($basicUsersData: JSON, $companyUsersData: JSON) {
    addUser(basicUsersData: $basicUsersData, companyUsersData: $companyUsersData)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: Int, $basicUsersData: JSON, $companyUsersData: JSON) {
    updateUser(
      userId: $userId
      basicUsersData: $basicUsersData
      companyUsersData: $companyUsersData
    )
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: Int) {
    deleteUser(userId: $userId)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changeUserPassword($newPassword: String) {
    changeUserPassword(newPassword: $newPassword)
  }
`;
