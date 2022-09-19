import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Layout = ({ children }: any) => {
  const { asPath, locale } = useRouter()
  const { t } = useTranslation('common')

  return (
    <>
      <ul>
        <li>
          <Link href="/" locale={locale}>
            <a>{t('navigation.home')}</a>
          </Link>
        </li>
        <li>
          <Link href="/collection" locale={locale}>
            <a>{t('navigation.collection')}</a>
          </Link>
        </li>
        <li>
          <Link href="/about" locale={locale}>
            <a>{t('navigation.about')}</a>
          </Link>
        </li>
        <li>
          <Link href={asPath} locale={locale === "fr" ? "en" : "fr"}>
            <a>{locale === "fr" ? "English" : "Français"}</a>
          </Link>
        </li>
      </ul>
      <div className="nav-price snipcart-checkout">
        <span>🛒</span>
        <p className="snipcart-total-price">$0.00</p>
      </div>
      <hr />
      {children}
      <hr />
      <footer>
        <p>Footer</p>
      </footer>
    </>
  )
}

export default Layout
