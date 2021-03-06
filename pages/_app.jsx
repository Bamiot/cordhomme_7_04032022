import Head from 'next/head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {page}
      </>
    ))
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
