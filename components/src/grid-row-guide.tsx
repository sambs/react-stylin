import { createStylinElement } from 'stylin'
import { ThemeContext } from './theme'

export const GridRowGuide = createStylinElement({
  element: 'div',
  displayName: 'GridRowGuide',
  themeContext: ThemeContext,
  defaultStyleProps: { disabled: false },
  defaultStyles: ({ theme, props }) => ({
    background: props.disabled
      ? undefined
      : `repeating-linear-gradient(#fff, #fff ${theme.gridRowHeight}px, #eee ${
          theme.gridRowHeight
        }px, #eee ${theme.gridRowHeight * 2}px)`,
  }),
})
