import * as React from 'react'

export interface Theme {}

export interface Context {}

export const ThemeContext = React.createContext<Theme>({})
export const ContextContext = React.createContext<Context>({})

export type StyleResolver<P extends StyleProps> = (params: {
  theme: Theme
  context: Context
  props: P
  defaults: React.CSSProperties
}) => React.CSSProperties

export function useStylin<P extends StyleProps>(
  props: P,
  ...resolvers: Array<StyleResolver<P> | undefined>
) {
  const theme = React.useContext(ThemeContext)
  const context = React.useContext(ContextContext)

  let style: React.CSSProperties = {}

  for (const resolver of resolvers) {
    if (resolver) {
      style = resolver({ theme, context, props, defaults: style })
    }
  }
  return style
}

type ElementName = keyof JSX.IntrinsicElements

type StyleProps = { [prop: string]: any }

type StylinElementProps<
  E extends ElementName,
  P extends StyleProps
> = JSX.IntrinsicElements[E] & {
  styles?: StyleResolver<P>
} & Partial<P>

type CreateStylinElementParams<E extends ElementName, P extends StyleProps> = {
  defaultProps?: JSX.IntrinsicElements[E]
  defaultStyles?: StyleResolver<P>
  defaultStyleProps?: P
  displayName?: string
  element: E
}

export const createStylinElement = <
  E extends ElementName,
  P extends StyleProps
>({
  defaultProps,
  defaultStyles,
  defaultStyleProps,
  displayName = 'Element',
  element,
}: CreateStylinElementParams<E, P>) => {
  const component = (props: StylinElementProps<E, P>) => {
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

type BoxProps<E extends ElementName> = {
  as: E
  styles?: StyleResolver<{}>
} & JSX.IntrinsicElements[E]

export function Box<E extends ElementName>({
  as,
  styles,
  ...props
}: BoxProps<E>) {
  const style = useStylin({}, styles)
  return React.createElement(as, { style, ...props })
}
