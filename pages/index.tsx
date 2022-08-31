import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title key="metaTitle">Home</title>
        <meta key="metaDescription" name="description" content="Home description" />
      </Head>
      <h1>Home</h1>
    </>
  )
}

export default Home
