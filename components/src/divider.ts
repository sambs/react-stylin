import { createStylinElement } from '@sambs/react-stylin'

export const Divider = createStylinElement({
  element: 'hr',
  displayName: 'Divider',
  defaultStyles: ({ theme }) => ({
    backgroundColor: theme.colors.divider,
    border: 0,
    height: '1px',
    margin: 0,
  }),
})
