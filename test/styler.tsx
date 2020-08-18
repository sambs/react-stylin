import * as React from 'react'
import { createStyler } from '@sambs/react-stylin'
import { Context, createRendererWithContext } from './utils'

const Styler = createStyler(Context)

test('Styler', () => {
  let component = createRendererWithContext(
    <Styler
      styles={(theme) => ({
        color: theme.colors.primary,
      })}
    >
      {(style) => <span style={style}>Red!</span>}
    </Styler>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
