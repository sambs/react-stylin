import * as React from 'react'

export type StyleParams = { [prop: string]: any }

export type StyleResolver<C, P extends StyleParams> = (
  context: C,
  params: Required<P>,
  defaults: React.CSSProperties
) => React.CSSProperties

export function useStylin<C, P extends StyleParams>(
  context: React.Context<C>,
  params: Required<P>,
  ...resolvers: Array<StyleResolver<C, P> | undefined>
) {
  const contextValue = React.useContext(context)

  let style: React.CSSProperties = {}

  for (const resolver of resolvers) {
    if (resolver) {
      style = resolver(contextValue, params, style)
    }
  }
  return style
}
