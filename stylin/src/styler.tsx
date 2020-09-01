import * as React from 'react'
import { StyleResolver, useStylin } from './core'

export type StylerProps = {
  children: (style: React.CSSProperties) => JSX.Element
  styles: StyleResolver<{}>
}

export const Styler = ({ children, styles }: StylerProps) => {
  const style = useStylin({}, styles)
  return children(style)
}
