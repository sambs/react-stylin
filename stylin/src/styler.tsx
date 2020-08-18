import * as React from 'react'
import { StyleResolver, useStylin } from './core'

export type StylerProps<C> = {
  children: (style: React.CSSProperties) => JSX.Element
  styles: StyleResolver<C, {}>
}

export const createStyler = <C,>(context: React.Context<C>) => {
  const Styler = ({ children, styles }: StylerProps<C>) => {
    const style = useStylin(context, {}, styles)
    return children(style)
  }
  return Styler
}
