import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

import { gql, useQuery } from "@apollo/client"

const HOME_QUERY = gql`
  query Home($id: ID!, $locales: Locale!) {
    home(where: { id: $id }, locales: [$locales]) {
      description
      slug
      title
    }
  }
`;

const Home: NextPage = () => {
  const { t } = useTranslation('common')
  const { loading, data, error } = useQuery(HOME_QUERY, {
    variables: {
      id: 'cl7t1xsvsfbvn0buqeiiltvdh',
      locales: 'fr'
    },
  });

  console.log('loading', loading)
  console.log('data', data)
  console.log('error', error)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Oops, something went wrong {error.message}</div>

  return (
    <>
      <Head>
        <title key="metaTitle">Home</title>
        <meta key="metaDescription" name="description" content="Home description" />
      </Head>
      <h1>{t('navigation.home')} (from json traduction)</h1>
      <h1>{data.home.title}</h1>
      <p>{data.home.description}</p>
      <p>{data.home.slug}</p>
    </>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Home
