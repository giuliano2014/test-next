import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

import { gql } from "@apollo/client"
import client from "../apollo-client"

const Home: NextPage = ({ home }: any) => {
  const { t } = useTranslation('common')
  // const home = homes[0]

  return (
    <>
      <Head>
        <title key="metaTitle">Home</title>
        <meta key="metaDescription" name="description" content="Home description" />
      </Head>
      <h1>Traduction : {t('navigation.home')}</h1>
      <h1>{home.title}</h1>
      <p>{home.description}</p>
      <p>{home.slug}</p>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  const { data } = await client.query({
    query: gql`
      query Home($id: ID!, $locales: Locale!) {
        home(where: { id: $id }, locales: [$locales]) {
          description
          slug
          title
        }
      },
    `,
    variables: {
      id: "cl7t1xsvsfbvn0buqeiiltvdh",
      locales: locale
    },
  })

  const { home } = data

  return {
    props: {
      home,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

// export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
//   const { data } = await client.query({
//     query: gql`
//       query Homes($locales: Locale!) {
//         homes(locales: [$locales]) {
//           description
//           slug
//           title
//         }
//       }
//     `,
//     variables: {
//       locales: locale
//     },
//   })

//   const { homes } = data

//   return {
//     props: {
//       homes,
//       ...await serverSideTranslations(locale, ['common']),
//     },
//   }
// }

export default Home
