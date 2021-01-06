import React from "react"
import { Input } from "antd"
import styled from "styled-components"
import { InputProps } from "antd/lib/input"

export type TitleInputProps = InputProps & {}

const StyledInput = styled(Input)`
  font-size: 40px;
  font-weight: bold;
`

const TitleInput: React.FC<TitleInputProps> = (props) => {
  const { children, ...rest } = props
  return <StyledInput {...rest} />
}

TitleInput.defaultProps = {
  bordered: false,
}

export default TitleInput
