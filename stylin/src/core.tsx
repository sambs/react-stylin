import * as React from 'react'

export interface StyleContextType {}

export const StyleContext = React.createContext<StyleContextType>({})

export type StyleParams = { [prop: string]: any }

export type StyleResolver<P extends StyleParams> = (
  context: StyleContextType,
  params: P
) => React.CSSProperties

export type Styles<P extends StyleParams> =
  | React.CSSProperties
  | StyleResolver<P>

export function useStylin<P extends StyleParams>(
  params: P,
  styles: Styles<P>
): React.CSSProperties {
  const context = React.useContext(StyleContext)

  if (typeof styles === 'function') {
    return styles(context, params)
  } else {
    return styles
  }
}
