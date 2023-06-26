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

export const CreateUserQuery = /* GraphQL */ `
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      address
    }
  }
`;

export const ListOrdersQuery = /* GraphQL */ `
  query listOrders($input: ListOrdersInput!) {
    listOrders(input: $input) {
      id
      product
      quantity
      userId
    }
  }
`;

export const GetOrderQuery = /* GraphQL */ `
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      id
      product
      quantity
      userId
    }
  }
`;

export const CreateOrderQuery = /* GraphQL */ `
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      product
      quantity
      userId
    }
  }
`;

// ## Merged (Fully-Projected) Below
export const ListMergedOrdersQuery = /* GraphQL */ `
  query listOrders($input: ListOrdersInput!) {
    listOrders(input: $input) {
      id
      product
      quantity
      userId
      user {
        id
        name
        address
      }
    }
  }
`;

export const GetMergedOrderQuery = /* GraphQL */ `
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      id
      product
      quantity
      userId
      user {
        id
        name
        address
      }
    }
  }
`;

export const CreateMergedOrderQuery = /* GraphQL */ `
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      product
      quantity
      userId
      user {
        id
        name
        address
      }
    }
  }
`;
