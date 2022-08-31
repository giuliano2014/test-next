import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const About: NextPage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title key="metaTitle">About</title>
        <meta key="metaDescription" name="description" content="About description" />
      </Head>
      <h1>{t('navigation.about')}</h1>
    </>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default About
