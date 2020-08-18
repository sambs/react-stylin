import * as React from 'react'
import { Context, createRendererWithContext } from './utils'

import { createStylinComponent } from '@sambs/react-stylin'

const Alert = createStylinComponent({
  element: 'div',
  displayName: 'Alert',
  defaultProps: { role: 'alert' },
  defaultStyles: (theme) => ({
    background: theme.colors.primary,
  }),
  context: Context,
})

test('Component with default props', () => {
  const component = createRendererWithContext(<Alert>Uh Oh!</Alert>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

type TextStyleProps = {
  size: 'sm' | 'md' | 'lg'
}

const Text = createStylinComponent({
  element: 'div',
  displayName: 'Text',
  defaultStyleProps: {
    size: 'md' as TextStyleProps['size'],
  },
  defaultStyles: (theme, props) => theme.text[props.size],
  context: Context,
})

test('Component with style props', () => {
  let component = createRendererWithContext(<Text>Hey there!</Text>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  component = createRendererWithContext(<Text size="sm">Hey there!</Text>)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  component = createRendererWithContext(
    <Text styles={({ colors }) => ({ color: colors.primary })}>Hey there!</Text>
  )
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

const ForwardRefTest: React.FC<{ count: number }> = ({ count }) => {
  const textRef = React.useRef<HTMLDivElement>(null)
  return <Text innerRef={textRef}>{count}</Text>
}

test('Component with ref forwarding', () => {
  let component = createRendererWithContext(<ForwardRefTest count={3} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
