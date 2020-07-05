import { createStylinElement } from 'stylin'
import { StyleContext } from './context'

export const Box = createStylinElement({
  element: 'div',
  displayName: 'Box',
  context: StyleContext,
})
