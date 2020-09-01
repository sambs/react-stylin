import * as React from 'react'
import { StyleContextType, StyleResolver, useStylin } from './core'

export type StylerProps<C extends StyleContextType = StyleContextType> = {
  children: (style: React.CSSProperties) => JSX.Element
  styles: StyleResolver<{}, C>
}

export const Styler = ({ children, styles }: StylerProps) => {
  const style = useStylin({}, styles)
  return children(style)
}
