import Link from 'next/link'

const Layout = ({ children }: any) => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/collection">
            <a>Collection</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
      <hr />
      {children}
      <hr />
      <footer>
        <p>FOOTER</p>
      </footer>
    </>
  )
}

export default Layout
