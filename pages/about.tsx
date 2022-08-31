import type { NextPage } from 'next'
import Head from 'next/head'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title key="metaTitle">About</title>
        <meta key="metaDescription" name="description" content="About description" />
      </Head>
      <h1>About</h1>
    </>
  )
}

export default About
