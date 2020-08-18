import { createStylinElement } from '@sambs/react-stylin'
import { StyleContext } from './context'
import { px } from './utils'

export const Spacer = createStylinElement({
  element: 'div',
  displayName: 'Spacer',
  context: StyleContext,
  defaultStyleProps: { size: 1 },
  defaultStyles: ({ theme }, { size }) => ({
    height: px(theme.gridRowHeight * size),
  }),
})
