import * as React from 'react'

export interface Theme {}

export interface Context {}

export const ThemeContext = React.createContext<Theme>({})
export const ContextContext = React.createContext<Context>({})

export type StyleResolver = (
  theme: Theme,
  context: Context,
  defaults: React.CSSProperties
) => React.CSSProperties

export function useStylin(
  resolver?: StyleResolver,
  defaults: React.CSSProperties = {}
) {
  const theme = React.useContext(ThemeContext)
  const context = React.useContext(ContextContext)
  return resolver ? resolver(theme, context, defaults) : defaults
}

type ElementName = keyof JSX.IntrinsicElements

type StylinElementProps<E extends ElementName> = JSX.IntrinsicElements[E] & {
  styles?: StyleResolver
}

type CreateStylinElementParams<E extends ElementName> = {
  defaultProps?: JSX.IntrinsicElements[E]
  defaultStyle?: React.CSSProperties
  displayName?: string
  element: E
}

export const createStylinElement = <E extends ElementName>({
  defaultProps,
  defaultStyle,
  displayName = 'Element',
  element,
}: CreateStylinElementParams<E>) => {
  const component = ({ styles, ...props }: StylinElementProps<E>) => {
    const style = useStylin(styles, defaultStyle)
    return React.createElement(element, {
      ...defaultProps,
      ...props,
      style,
    })
  }
  component.displayName = displayName
  return component
}

type BoxProps<E extends ElementName> = {
  as: E
  styles?: StyleResolver
} & JSX.IntrinsicElements[E]

export function Box<E extends ElementName>({
  as,
  styles,
  ...props
}: BoxProps<E>) {
  const style = useStylin(styles)
  return React.createElement(as, { style, ...props })
}
