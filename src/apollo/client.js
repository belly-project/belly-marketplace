import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/antonicarol/d-olympus-market",
});
