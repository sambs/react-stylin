import * as React from 'react'
import { Context, createRendererWithContext } from './utils'
import { createStylinElement } from '@sambs/react-stylin'

const Alert = createStylinElement({
  element: 'div',
  displayName: 'Alert',
  defaultProps: { role: 'alert' },
  defaultStyles: (theme) => ({
    background: theme.colors.primary,
  }),
  context: Context,
})

test('Element with default props', () => {
  const component = createRendererWithContext(<Alert>Uh Oh!</Alert>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

type TextStyleProps = {
  size: 'sm' | 'md' | 'lg'
}

const Text = createStylinElement({
  element: 'div',
  displayName: 'Text',
  defaultStyleProps: {
    size: 'md' as TextStyleProps['size'],
  },
  defaultStyles: (theme, props) => theme.text[props.size],
  context: Context,
})

test('Element with style props', () => {
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

test('Element with ref forwarding', () => {
  let component = createRendererWithContext(<ForwardRefTest count={3} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
