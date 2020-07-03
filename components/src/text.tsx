import React from 'react'
import { StyleResolver, useStylin } from 'stylin'
import { Theme, ThemeContext } from './theme'

type TextStyleProps = {
  size?: keyof Theme['text']
  font?: keyof Theme['fonts']
}

type TextProps = TextStyleProps & {
  styles?: StyleResolver<Theme, TextStyleProps>
}

const px = (i: number) => `${i}px`

const defaultTextStyles: StyleResolver<Theme, TextStyleProps> = ({
  theme,
  props: { font = 'primary', size = 'md' },
}) => {
  const { gridRowHeight } = theme
  const { fontFamily, offsetTop, offsetBottom } = theme.fonts[font]
  const { fontSize, rowSpan } = theme.text[size!]
  const lineHeight = gridRowHeight * rowSpan
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

export const Text: React.FC<TextProps> = ({ children, font, size, styles }) => {
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
