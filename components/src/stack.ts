import { createStylinComponent } from '@sambs/react-stylin'
import { StyleContext } from './context'
import { px } from './utils'

export const Stack = createStylinComponent({
  element: 'div',
  displayName: 'Stack',
  context: StyleContext,
  defaultStyleProps: {
    spacing: 1,
  },
  defaultStyles: ({ theme: { gridRowHeight } }, { spacing }) => ({
    display: 'grid',
    gridRowGap: px(spacing * gridRowHeight),
  }),
})
