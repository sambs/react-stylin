import { createStylinComponent } from 'stylin'
import { StyleContext } from './context'
import { px } from './utils'

export const Spacer = createStylinComponent({
  element: 'div',
  displayName: 'Spacer',
  context: StyleContext,
  defaultStyleProps: { size: 1 },
  defaultStyles: ({ theme }, { size }) => ({
    height: px(theme.gridRowHeight * size),
  }),
})
