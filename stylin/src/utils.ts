import { CSSProperties } from 'react'
import { StyleResolver, StyleContextType } from './core'

export const mergeStyles = <P>(
  styles: Array<StyleResolver<P> | CSSProperties>
): StyleResolver<P> => (context: StyleContextType, params: P) =>
  styles.reduce((acc: CSSProperties, styles) => {
    return {
      ...acc,
      ...(typeof styles == 'function' ? styles(context, params) : styles),
    }
  }, {})
