import { createStylinElement } from '@sambs/react-stylin'

export const GridRowGuide = createStylinElement({
  element: 'div',
  displayName: 'GridRowGuide',
  defaultStyleProps: { disabled: false },
  defaultStyles: ({ theme }, { disabled }) => ({
    background: disabled
      ? undefined
      : `repeating-linear-gradient(#fff, #fff ${theme.gridRowHeight}px, #eee ${
          theme.gridRowHeight
        }px, #eee ${theme.gridRowHeight * 2}px)`,
  }),
})
