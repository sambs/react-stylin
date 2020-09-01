import * as React from 'react'
import { StyleSheet } from '@sambs/react-stylin'
import { createRendererWithContext } from './utils'

test('StyleSheeet', () => {
  let component = createRendererWithContext(
    <StyleSheet
      styles={({ theme }) => `
        body {
          color: ${theme.colors.primary};
        }
      `}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
