import * as React from 'react'

export type StyleResolver<T, P extends StyleProps> = (params: {
  theme: T
  props: P
  defaults: React.CSSProperties
}) => React.CSSProperties

export function useStylin<T, P extends StyleProps>(
  themeContext: React.Context<T>,
  props: P,
  ...resolvers: Array<StyleResolver<T, P> | undefined>
) {
  const theme = React.useContext(themeContext)

  let style: React.CSSProperties = {}

  for (const resolver of resolvers) {
    if (resolver) {
      style = resolver({ theme, props, defaults: style })
    }
  }
  return style
}

type ElementName = keyof JSX.IntrinsicElements

type StyleProps = { [prop: string]: any }

type StylinElementProps<
  E extends ElementName,
  T,
  P extends StyleProps
> = JSX.IntrinsicElements[E] & {
  styles?: StyleResolver<T, P>
} & Partial<P>

type CreateStylinElementParams<
  E extends ElementName,
  T,
  P extends StyleProps
> = {
  defaultProps?: JSX.IntrinsicElements[E]
  defaultStyles?: StyleResolver<T, P>
  defaultStyleProps?: P
  displayName?: string
  element: E
  themeContext: React.Context<T>
}

export const createStylinElement = <
  E extends ElementName,
  T,
  P extends StyleProps
>({
  defaultProps,
  defaultStyles,
  defaultStyleProps,
  displayName = 'Element',
  element,
  themeContext,
}: CreateStylinElementParams<E, T, P>) => {
  const component: React.FC<StylinElementProps<E, T, P>> = (props) => {
    const styleProps: Partial<P> = {}
    const elemProps: JSX.IntrinsicElements[E] = {}

    for (const prop in defaultStyleProps) {
      if (prop in props) {
        styleProps[prop] = props[prop]
      } else {
        styleProps[prop] = defaultStyleProps[prop]
      }
    }

    for (const prop in props) {
      if (defaultStyleProps && defaultStyleProps.hasOwnProperty(prop)) continue
      if (prop == 'styles') continue
      // @ts-ignore
      elemProps[prop] = props[prop]
    }

    const style = useStylin(
      themeContext,
      styleProps as Required<P>,
      defaultStyles,
      props.styles
    )

    return React.createElement(element, {
      ...defaultProps,
      ...elemProps,
      style,
    })
  }

  component.displayName = displayName

  return component
}
