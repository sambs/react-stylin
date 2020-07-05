import { createStylinElement } from 'stylin'
import { ThemeContext } from './theme'
import { px } from './utils'

export const Stack = createStylinElement({
  element: 'div',
  displayName: 'Stack',
  themeContext: ThemeContext,
  defaultStyleProps: {
    spacing: 1,
  },
  defaultStyles: ({ theme: { gridRowHeight }, props: { spacing } }) => ({
    display: 'grid',
    gridRowGap: px(spacing * gridRowHeight),
  }),
})
