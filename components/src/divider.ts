import { createStylinComponent } from 'stylin'
import { StyleContext } from './context'

export const Divider = createStylinComponent({
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
