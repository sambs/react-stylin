import * as React from 'react'

type StyleParams = { [prop: string]: any }

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

type StylinElementProps<
  E extends React.ElementType,
  C,
  P extends StyleParams
> = React.ComponentProps<E> & {
  styles?: StyleResolver<C, P>
} & Partial<P>

type CreateStylinElementParams<
  E extends React.ElementType,
  C,
  P extends StyleParams
> = {
  defaultProps?: React.ComponentProps<E>
  defaultStyles?: StyleResolver<C, P>
  defaultStyleProps?: P
  displayName?: string
  element: E
  context: React.Context<C>
}

export const createStylinComponent = <
  E extends React.ElementType,
  C,
  P extends StyleParams
>({
  defaultProps,
  defaultStyles,
  defaultStyleProps,
  displayName = 'StylinComponent',
  element,
  context,
}: CreateStylinElementParams<E, C, P>) => {
  const component: React.FC<StylinElementProps<E, C, P>> = (props) => {
    const styleProps: Partial<P> = {}
    const elemProps: Partial<React.ComponentProps<E>> = {}

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
      context,
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
