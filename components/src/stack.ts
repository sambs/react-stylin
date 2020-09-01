import { createStylinElement } from '@sambs/react-stylin'
import { px } from './utils'

export const Stack = createStylinElement({
  element: 'div',
  displayName: 'Stack',
  defaultStyleProps: {
    spacing: 1,
  },
  defaultStyles: ({ theme: { gridRowHeight } }, { spacing }) => ({
    display: 'grid',
    gridRowGap: px(spacing * gridRowHeight),
  }),
})
