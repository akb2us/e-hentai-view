import React from 'react'
import Head from 'next/head'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { AppProps } from 'next/app'
import ThemeProvider from 'src/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Router from 'next/router'
import moment from 'moment'
import { SWRConfig } from 'swr'
import { appWithTranslation } from 'i18n'
moment.locale('zh-cn')
Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  console.log(url)
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>EhentaiView</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SWRConfig value={{ errorRetryInterval: 100 }}>
        <ThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
          <style jsx global>
            {`
              a {
                text-decoration: none;
                color: unset;
              }
            `}
          </style>
        </ThemeProvider>
      </SWRConfig>
    </React.Fragment>
  )
}

export default appWithTranslation(MyApp)
