import { createStylinElement } from 'stylin'
import { ThemeContext } from './theme'

export const Divider = createStylinElement({
  element: 'hr',
  displayName: 'Divider',
  themeContext: ThemeContext,
  defaultStyles: ({ theme }) => ({
    backgroundColor: theme.colors.divider,
    border: 0,
    height: '1px',
    margin: 0,
  }),
})
