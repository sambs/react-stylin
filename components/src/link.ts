import { createStylinComponent } from 'stylin'
import { StyleContext, Theme } from './context'

export const Link = createStylinComponent({
  element: 'a',
  displayName: 'Link',
  context: StyleContext,
  defaultStyleProps: {
    variant: 'default' as keyof Theme['links'],
    textSize: 'md' as keyof Theme['text'],
    font: 'primary' as keyof Theme['fonts'],
  },
  defaultStyles: ({ theme: { links } }, { variant }) => ({
    ...links[variant],
  }),
})
