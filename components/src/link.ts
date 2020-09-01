import { createStylinElement } from '@sambs/react-stylin'
import { Theme } from './context'

export const Link = createStylinElement({
  element: 'a',
  displayName: 'Link',
  defaultStyleProps: {
    variant: 'default' as keyof Theme['links'],
    textSize: 'md' as keyof Theme['text'],
    font: 'primary' as keyof Theme['fonts'],
  },
  defaultStyles: ({ theme: { links } }, { variant }) => ({
    ...links[variant],
  }),
})
