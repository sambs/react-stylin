import * as React from 'react'

export interface StyleContextType {}

export const StyleContext = React.createContext<StyleContextType>({})

export type StyleParams = { [prop: string]: any }

export type StyleResolver<
  P extends StyleParams,
  C extends StyleContextType = StyleContextType
> = (
  context: C,
  params: P,
  defaults: React.CSSProperties
) => React.CSSProperties

export function useStylin<P extends StyleParams>(
  params: P,
  ...resolvers: Array<StyleResolver<P> | undefined>
) {
  const context = React.useContext(StyleContext)

  let style: React.CSSProperties = {}

  for (const resolver of resolvers) {
    if (resolver) {
      style = resolver(context, params, style)
    }
  }
  return style
}
