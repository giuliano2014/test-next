import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SingleItem = () => {
  const { locale, query } = useRouter()
  const { slug } = query
  const { t } = useTranslation('common')

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

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default SingleItem
