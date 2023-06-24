export const ListUsersQuery = /* GraphQL */ `
  query listUsers($input: ListUsersInput!) {
    listUsers(input: $input) {
      id
      name
      address
    }
  }
`;

export const GetUserQuery = /* GraphQL */ `
  query getUser($input: GetUserInput!) {
    getUser(input: $input) {
      id
      name
      address
    }
  }
`;
