import React from 'react'
import { StyleResolver, useStylin } from '@sambs/react-stylin'
import { Theme } from './context'
import { px } from './utils'

export type TextStyleProps = {
  size?: keyof Theme['text']
  font?: keyof Theme['fonts']
}

export type TextProps = TextStyleProps & {
  children?: React.ReactNode
  styles?: StyleResolver<TextStyleProps>
}

export const textStyles: StyleResolver<Required<TextStyleProps>> = (
  { theme },
  { font, size }
) => {
  const { gridRowHeight } = theme
  const { fontFamily, offsetTop, offsetBottom } = theme.fonts[font]
  const fontSize = gridRowHeight * theme.text[size].fontSize
  const lineHeight = gridRowHeight * theme.text[size].lineHeight
  const lineHeightSpace = (lineHeight - fontSize) / 2
  const marginTop = -(offsetTop * fontSize + 1 + lineHeightSpace)
  const marginBottom = -(offsetBottom * fontSize + 1 + lineHeightSpace)

  return {
    fontFamily,
    fontSize: px(fontSize),
    lineHeight: px(lineHeight),
    marginTop: px(marginTop),
    marginBottom: px(marginBottom),
  }
}

export const Text = React.forwardRef<HTMLDivElement, TextProps>(
  ({ children, font = 'primary', size = 'md', styles = textStyles }, ref) => {
    const style = useStylin({ font, size }, styles)
    return (
      <div style={{ padding: '1px 0' }} ref={ref}>
        <div style={style}>{children}</div>
      </div>
    )
  }
)

Text.displayName = 'Text'
