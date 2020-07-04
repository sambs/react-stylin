import * as React from 'react'
import { createStylinElement } from 'stylin'
import { create as createRenderer } from 'react-test-renderer'

export const theme = {
  colors: {
    primary: 'red',
    secondary: 'green',
  },
  text: {
    lg: {
      fontSize: '24px',
    },
    md: {
      fontSize: '16px',
    },
    sm: {
      fontSize: '12px',
    },
  },
}

type Theme = typeof theme

const ThemeContext = React.createContext(theme)

const createRendererWithContext = (component: JSX.Element) =>
  createRenderer(
    <ThemeContext.Provider value={theme}>{component}</ThemeContext.Provider>
  )

const Alert = createStylinElement({
  element: 'div',
  displayName: 'Alert',
  defaultProps: { role: 'alert' },
  defaultStyles: ({ theme }) => ({
    background: theme.colors.primary,
  }),
  themeContext: ThemeContext,
})

test('Custom Element with default props', () => {
  const component = createRendererWithContext(<Alert>Uh Oh!</Alert>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

type TextStyleProps = {
  size: 'sm' | 'md' | 'lg'
}

const Text = createStylinElement<'div', Theme, TextStyleProps>({
  element: 'div',
  displayName: 'Text',
  defaultStyleProps: {
    size: 'md',
  },
  defaultStyles: ({ theme, props }) => theme.text[props.size],
  themeContext: ThemeContext,
})

test('Custom Element with style props', () => {
  let component = createRendererWithContext(<Text>Hey there!</Text>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  component = createRendererWithContext(<Text size="sm">Hey there!</Text>)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  component = createRendererWithContext(
    <Text styles={() => ({ fontSize: '15px' })}>Hey there!</Text>
  )
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
