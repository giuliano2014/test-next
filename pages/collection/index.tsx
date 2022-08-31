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

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Collection
