import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

// !는 반드시 있어야할 값!!
