import * as React from 'react'
import { createStyleSheet } from '@sambs/react-stylin'
import { Context, createRendererWithContext } from './utils'

const StyleSheet = createStyleSheet(Context)

test('StyleSheeet', () => {
  let component = createRendererWithContext(
    <StyleSheet
      styles={(theme) => `
        body {
          color: ${theme.colors.primary};
        }
      `}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
