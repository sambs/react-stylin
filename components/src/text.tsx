import React from 'react'
import { StyleResolver, useStylin } from 'stylin'
import { Theme, ThemeContext } from './theme'
import { px } from './utils'

type TextStyleProps = {
  size?: keyof Theme['text']
  font?: keyof Theme['fonts']
}

type TextProps = TextStyleProps & {
  styles?: StyleResolver<Theme, TextStyleProps>
}

const defaultTextStyles: StyleResolver<Theme, TextStyleProps> = ({
  theme,
  props: { font, size },
}) => {
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

export const Text: React.FC<TextProps> = ({
  children,
  font = 'primary',
  size = 'md',
  styles,
}) => {
  const style = useStylin(
    ThemeContext,
    { font, size },
    defaultTextStyles,
    styles
  )
  return (
    <div style={{ padding: '1px 0' }}>
      <div style={style}>{children}</div>
    </div>
  )
}

Text.displayName = 'Text'
