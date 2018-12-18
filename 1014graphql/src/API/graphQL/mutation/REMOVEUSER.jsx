import gql from "graphql-tag";

export const REMOVE_USER = gql`
  mutation($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }
`;
