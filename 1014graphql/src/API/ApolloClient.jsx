// js랑 jsx랑 동작하는 건 똑같은데 구분하기 위해서 만듬
// 아폴로 부스트(초심자용) vs 아폴로 클라이언트가 있음(고수용)

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://graphql-crud-server.herokuapp.com/graphql"
});

export default client;
