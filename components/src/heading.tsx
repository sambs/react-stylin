import React from 'react'
import { useStylin, StyleResolver } from '@sambs/react-stylin'
import { TextStyleProps, textStyles } from './text'

type HeadingProps = TextStyleProps &
  React.HTMLAttributes<HTMLHeadingElement> & {
    styles?: HeadingStyleResolver
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  }

type HeadingStyleResolver = StyleResolver<TextStyleProps>

export const Heading: React.FC<HeadingProps> = ({
  as = 'h1',
  font = 'primary',
  size = 'lg',
  styles = textStyles,
  ...props
}) => {
  const style = useStylin({ font, size }, styles)
  return React.createElement(as, {
    style,
    ...props,
  })
}

Heading.displayName = 'Heading'
