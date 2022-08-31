import Head from 'next/head'
import { useRouter } from 'next/router'

const SingleItem = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <Head>
        <title key="metaTitle">{slug}</title>
        <meta key="metaDescription" name="description" content={`${slug} description`} />
      </Head>
      <h1>{slug}</h1>
    </>
  )
}

export default SingleItem
