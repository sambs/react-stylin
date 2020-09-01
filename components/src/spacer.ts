import { createStylinElement } from '@sambs/react-stylin'
import { px } from './utils'

export const Spacer = createStylinElement({
  element: 'div',
  displayName: 'Spacer',
  defaultStyleProps: { size: 1 },
  defaultStyles: ({ theme }, { size }) => ({
    height: px(theme.gridRowHeight * size),
  }),
})
