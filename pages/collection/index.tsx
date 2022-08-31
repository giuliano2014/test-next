import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Collection: NextPage = () => {
  return (
    <>
      <Head>
        <title key="metaTitle">Collection</title>
        <meta key="metaDescription" name="description" content="Collection description" />
      </Head>
      <h1>Collection</h1>
      <ul>
        <li>
          <Link href="/collection/my-first-item">
            <a>First Item</a>
          </Link>
        </li>
        <li>
          <Link href="/collection/my-second-item">
            <a>Second Item</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Collection
