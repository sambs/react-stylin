import { createStylinElement } from '@sambs/react-stylin'
import { StyleContext } from './context'

export const Divider = createStylinElement({
  element: 'hr',
  displayName: 'Divider',
  context: StyleContext,
  defaultStyles: ({ theme }) => ({
    backgroundColor: theme.colors.divider,
    border: 0,
    height: '1px',
    margin: 0,
  }),
})
