import { gql } from '@apollo/client'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import client from '../../apollo-client'

const Collection: NextPage = ({ products }: any) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title key="metaTitle">Collection</title>
        <meta key="metaDescription" name="description" content="Collection description" />
      </Head>
      <h1>{t('navigation.collection')}</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.slug}>
            <Link href={`/collection/${product.slug}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  const { data } = await client.query({
    query: gql`
      query Products($locales: Locale!) {
        products(locales: [$locales]) {
          name
          slug
        }
      },
    `,
    variables: {
      locales: locale
    },
  })

  const { products } = data

  return {
    props: {
      products,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

export default Collection
