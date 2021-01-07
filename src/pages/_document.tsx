import React from "react"
import Document, { Head, Main, NextScript, Html } from "next/document"
import { ServerStyleSheet } from "styled-components"

class MyDocument extends Document<any> {
  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.3/pace.min.js"
            integrity="sha512-TJX3dl0dqF2pUpKKtV60kECO4y8blw4ZPIZNEkfUnFepRKfx4nfiI37IqFa1TEsRQJkPGTIK4BBJ2k/lmsK7HA=="
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.3/themes/purple/pace-theme-minimal.min.css"
            integrity="sha512-8ZRc45LBTTet35eaJ/mj213X+yUigGkILUABYLYAWZ+QoTfNB2Kvnbq8A9KmSa39+rj6gS6lKDVo7Jqx8M7V8A=="
            crossOrigin="anonymous"
          />
          <style />
          <link
            href="https://fonts.googleapis.com/css2?family=Jua&family=Modak&family=Nanum+Gothic:wght@400;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {this.props.styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const styledComponentsSheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentsSheet.collectStyles(<App {...props} />),
      })
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styledComponentsSheet.getStyleElement()}
        </>
      ),
    }
  } finally {
    styledComponentsSheet.seal()
  }
}

export default MyDocument
