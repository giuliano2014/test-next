import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
      <link rel="preconnect" href="<https://app.snipcart.com>" />
      <link rel="preconnect" href="<https://cdn.snipcart.com>" />
      <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script async src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>
        <div hidden id="snipcart" data-api-key="OGEzYzA1Y2YtYjcxNS00N2RjLWJlMDYtNzFmZDViZmZkNzU4NjM3NzQwNjU2NTg3MjExMzMy
" data-config-modal-style="side" data-currency="eur"></div>
      </body>
    </Html>
  )
}
