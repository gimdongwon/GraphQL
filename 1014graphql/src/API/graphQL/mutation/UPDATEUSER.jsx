import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation($id: String!, $name: String!) {
    updateUser(name: $name, id: $id) {
      id
      name
    }
  }
`;
