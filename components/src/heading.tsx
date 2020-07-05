import React from 'react'
import { useStylin, StyleResolver } from 'stylin'
import { StyleContext, StyleContextType } from './context'
import { TextStyleProps, defaultTextStyles } from './text'

type HeadingProps = TextStyleProps &
  React.HTMLAttributes<HTMLHeadingElement> & {
    styles?: HeadingStyleResolver
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  }

type HeadingStyleResolver = StyleResolver<StyleContextType, TextStyleProps>

export const Heading: React.FC<HeadingProps> = ({
  as = 'h1',
  font = 'primary',
  size = 'lg',
  styles,
  ...props
}) => {
  const style = useStylin(
    StyleContext,
    { font, size },
    defaultTextStyles,
    styles
  )
  return React.createElement(as, {
    style,
    ...props,
  })
}

Heading.displayName = 'Heading'
