import { gql } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import client from '../../apollo-client'

const SingleItem = ({ product }: any) => {
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation('common')
 
  // Display loading until `getStaticProps()` finishes running, and populates the props.
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title key="metaTitle">{product.name}</title>
        <meta key="metaDescription" name="description" content={product.description} />
      </Head>
      <Link href="/collection" locale={locale}>
        <a>{t('back')}</a>
      </Link>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }: any) => {
  const [ fr, en ] = locales

  const { data } = await client.query({
    query: gql`
      query Products($localesFr: Locale!, $localesEn: Locale!) {
        ${fr}: products(locales: [$localesFr]) {
          slug
        }
        ${en}: products(locales: [$localesEn]) {
          slug
        }
      },
    `,
    variables: {
      localesFr: fr,
      localesEn: en,
    },
  })

  const pathsFr = data[fr].map((product: any) => ({ params: { slug: product.slug }, locale: fr }))
  const pathsEn =  data[en].map((product: any) => ({ params: { slug: product.slug }, locale: en }))
  const paths = [...pathsFr, ...pathsEn]

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }: any) => {
  const { slug } = params

  const { data } = await client.query({
    query: gql`
      query GetProductByLocaleAndSlug($locales: Locale!, $slug: String!) {
        products(locales: [$locales], where: {slug: $slug}) {
          name
          description
        }
      },
    `,
    variables: {
      locales: locale,
      slug: slug,
    },
  })

  const { products } = data
  
  return {
    props: {
      product: products[0],
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

export default SingleItem
