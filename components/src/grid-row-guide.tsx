import { createStylinComponent } from 'stylin'
import { StyleContext } from './context'

export const GridRowGuide = createStylinComponent({
  element: 'div',
  displayName: 'GridRowGuide',
  context: StyleContext,
  defaultStyleProps: { disabled: false },
  defaultStyles: ({ theme }, { disabled }) => ({
    background: disabled
      ? undefined
      : `repeating-linear-gradient(#fff, #fff ${theme.gridRowHeight}px, #eee ${
          theme.gridRowHeight
        }px, #eee ${theme.gridRowHeight * 2}px)`,
  }),
})
