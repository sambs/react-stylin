import { createStylinElement } from 'stylin'
import { ThemeContext } from './theme'
import { px } from './utils'

export const Spacer = createStylinElement({
  element: 'div',
  displayName: 'Spacer',
  themeContext: ThemeContext,
  defaultStyleProps: { size: 1 },
  defaultStyles: ({ theme, props }) => ({
    height: px(theme.gridRowHeight * props.size),
  }),
})
