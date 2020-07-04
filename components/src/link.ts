import { createStylinElement } from 'stylin'
import { ThemeContext, Theme } from './theme'

export const Link = createStylinElement({
  element: 'a',
  displayName: 'Link',
  themeContext: ThemeContext,
  defaultStyleProps: {
    variant: 'default' as keyof Theme['links'],
    textSize: 'md' as keyof Theme['text'],
    font: 'primary' as keyof Theme['fonts'],
  },
  defaultStyles: ({ theme: { links }, props: { variant } }) => ({
    ...links[variant],
  }),
})
