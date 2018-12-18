import gql from "graphql-tag";

export const SELETEUSER = gql`
  query {
    users(id: String, name: String) {
      id
      name
    }
  }
`;
