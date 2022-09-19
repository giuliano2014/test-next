import { gql } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
// import Image from 'next/image'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import client from '../../apollo-client'

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

const css = { width: '100%', height: 'auto' }

const SingleItem = ({ product }: any) => {
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation('common')
  
  // Display loading until `getStaticProps()` finishes running, and populates the props.
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  const {
    cover: { alt, height, url, width },
    description,
    gallery,
    id,
    name,
    price,
    slug,
  } = product
  
  return (
    <>
      <Head>
        <title key="metaTitle">{name}</title>
        <meta key="metaDescription" name="description" content={description} />
      </Head>
      <Link href="/collection" locale={locale}>
        <a>{t('back')}</a>
      </Link>
      <h1>{name}</h1> 
      <p>{description}</p>
      <p>{price} { locale === 'en' ? '$' : '€'}</p>
      <button
        className="btn snipcart-add-item"
        data-item-id={id}
        data-item-price={price}
        data-item-url={`products/${slug}`}
        data-item-image={url}
        data-item-name={product.name}
      >
        Add to cart 🛒
      </button>
      <Image
        alt={alt}
        blurDataURL={rgbDataURL(237, 181, 6)}
        height={height}
        placeholder="blur"
        sizes="100vw"
        src={url}
        style={css}
        width={width}
      />
      {gallery.map(({ alt, height, id, url, width }: any) => (
        <li key={id}>
          <Image
            alt={alt}
            blurDataURL={rgbDataURL(237, 181, 6)}
            height={height}
            placeholder="blur"
            sizes="100vw"
            src={url}
            style={css}
            width={width}
          />
        </li>
      ))}
      {/* <Image
        alt={alt}
        blurDataURL={rgbDataURL(237, 181, 6)}
        height={height}
        layout={"responsive"}
        placeholder="blur"
        src={url}
        width={width}
      />
      {gallery.map(({ alt, height, id, url, width }: any) => (
        <li key={id}>
          <Image
            alt={alt}
            blurDataURL={rgbDataURL(237, 181, 6)}
            height={height}
            layout={"responsive"}
            placeholder="blur"
            src={url}
            width={width}
          />
        </li>
      ))} */}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { data } = await client.query({
    query: gql`
      query GetAllProducts($locales: [Locale!]!) {
        products(locales: $locales) {
          localizations(includeCurrent: true, locales: $locales) {
            slug
            locale
          }
        }
      }
    `,
    variables: {
      locales: locales,
    },
  })

  const getAllProducts = data.products.map(({ localizations }: any) => {
    return localizations
  })

  const formatAllProducts = getAllProducts.flatMap((product: any) => {
    return product
  })

  const paths = formatAllProducts.map(({ locale, slug }: any) => {
    return {params: { slug: slug}, locale: locale }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }: any) => {
  const { slug } = params

  const { data } = await client.query({
    query: gql`
      query GetProductByLocaleAndSlug($locales: Locale!, $slug: String!) {
        products(locales: [$locales], where: {slug: $slug}) {
          cover {
            alt
            height
            url
            width
          }
          description
          gallery {
            alt
            height
            id
            url
            width
          }
          id
          name
          price
          slug
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
