import { createStylinElement } from 'stylin'
import { ThemeContext } from './theme'

export const Box = createStylinElement({
  element: 'div',
  displayName: 'Box',
  themeContext: ThemeContext,
})
