import * as React from 'react'
import { Styler } from '@sambs/react-stylin'
import { createRendererWithContext } from './utils'

test('Styler', () => {
  let component = createRendererWithContext(
    <Styler
      styles={({ theme }) => ({
        color: theme.colors.primary,
      })}
    >
      {(style) => <span style={style}>Red!</span>}
    </Styler>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
