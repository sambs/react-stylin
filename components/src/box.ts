import { createStylinComponent } from 'stylin'
import { StyleContext } from './context'

export const Box = createStylinComponent({
  element: 'div',
  displayName: 'Box',
  context: StyleContext,
})
