import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import client from "../apollo-client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default appWithTranslation(MyApp);
