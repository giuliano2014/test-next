import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'

const Collection: NextPage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title key="metaTitle">Collection</title>
        <meta key="metaDescription" name="description" content="Collection description" />
      </Head>
      <h1>{t('navigation.collection')}</h1>
      <ul>
        <li>
          <Link href="/en/collection/product-1">
            <a>Product 1</a>
          </Link>
        </li>
        <li>
          <Link href="/en/collection/product-2">
            <a>Product 2</a>
          </Link>
        </li>
        <li>
          <Link href="/en/collection/product-3">
            <a>Product 3</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Collection
