import React from "react"
import { providers, signIn } from "next-auth/client"
import { AppPageProps } from "../../_app.interface"

type Props = {}

const SignIn: AppPageProps<Props> = (props) => {
  const { providers } = props
  console.log(providers)
  return <div>sd</div>
}

SignIn.getInitialProps = async (context) => {
  return {
    // @ts-ignore
    providers: await providers(),
  }
}

export default SignIn
