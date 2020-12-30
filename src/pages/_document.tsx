import React from "react"
import Document, {
  Head,
  Main,
  NextScript,
  Html,
  DocumentContext,
} from "next/document"
import { ServerStyleSheet } from "styled-components"

class MyDocument extends Document<any> {
  render() {
    return (
      <Html>
        <Head>
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
