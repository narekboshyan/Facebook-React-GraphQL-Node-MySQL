import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query getAllUsers($search: String, $count: Int, $skip: Int, $adminUserId: Int) {
    getAllUsers(search: $search, count: $count, skip: $skip, adminUserId: $adminUserId)
  }
`;

export const GET_SINGLE_USER = gql`
  query getUser($userId: Int) {
    getUser(userId: $userId) {
      id
      firstName
      role
      lastName
      email
      companyUsersData {
        id
        value
        companyName
        companyId
        permissions {
          canReadOrders
          canReadQuotes
          canReadInvoices
        }
      }
    }
  }
`;
