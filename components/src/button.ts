import { createStylinElement } from 'stylin'
import { ThemeContext, Theme } from './theme'

export const Button = createStylinElement({
  element: 'button',
  displayName: 'Button',
  themeContext: ThemeContext,
  defaultStyleProps: {
    variant: 'default' as keyof Theme['buttons'],
    textSize: 'md' as keyof Theme['text'],
    font: 'primary' as keyof Theme['fonts'],
  },
  defaultStyles: ({ theme: { buttons }, props: { variant } }) => ({
    border: 0,
    background: 'none',
    ...buttons[variant],
  }),
})
