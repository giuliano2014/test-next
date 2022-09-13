import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "https://api-eu-central-1.hygraph.com/v2/cl7t16fkj0f1m01uuf61l0f6x/master",
    cache: new InMemoryCache(),
})

export default client
