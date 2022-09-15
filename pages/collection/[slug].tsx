import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { gql } from "@apollo/client"
import client from '../../apollo-client'
import { GetStaticProps } from 'next/types'

const GET_PRODUCTS = gql`
  query Products {
    products {
      slug
    }
  }
`;

const GET_SINGLE_PRODUCT = gql`
  query GetProductBySlug($slug: String!) {
    products(where: {slug: $slug}) {
      name
      description
    }
  }
`;

const SingleItem = ({ error, loading, product }: any) => {
  const { locale, query } = useRouter()
  const { slug } = query
  const { t } = useTranslation('common')

  console.log('product', product)
  console.log('error', error)
  console.log('loading', loading)

  return (
    <>
      <Head>
        <title key="metaTitle">{slug}</title>
        <meta key="metaDescription" name="description" content={`${slug} description`} />
      </Head>
      <Link href="/collection" locale={locale}>
        <a>{t('back')}</a>
      </Link>
      <h1>{slug}</h1>
    </>
  )
}

export const getStaticPaths = async () => {
  const { data, error, loading } = await client.query({query: GET_PRODUCTS})
  const paths = data.products.map((product: any) => ({ params: { slug: product.slug }}))

  // console.log('data', data)
  // console.log('error', error)
  // console.log('loading', loading)
  // console.log('paths', paths)

  // return {
  //   paths: [
  //     // if no `locale` is provided only the defaultLocale will be generated
  //     { params: { slug: 'my-first-item' }, locale: 'en' },
  //     { params: { slug: 'my-second-item' }, locale: 'en' },
  //     { params: { slug: 'my-first-item' }, locale: 'fr' },
  //     { params: { slug: 'my-second-item' }, locale: 'fr' },
  //   ],
  //   fallback: true,
  // }

  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }: any) => {
  const { slug } = params

  // console.log('SLUG', slug)

  const { data, error, loading } = await client.query({
    query: GET_SINGLE_PRODUCT,
    variables: {
      slug: slug,
    },
  })

  console.log('data', data)
  console.log('error', error)
  console.log('loading', loading)

  const { products } = data

  return {
    props: {
      // error: error,
      // loading: loading,
      product: products[0],
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

export default SingleItem
