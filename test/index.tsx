import * as React from 'react'
import { create as createRenderer } from 'react-test-renderer'

import {
  createStyler,
  createStylinComponent,
  createStyleSheet,
} from '@sambs/react-stylin'

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

const Context = React.createContext(theme)

const createRendererWithContext = (component: JSX.Element) =>
  createRenderer(<Context.Provider value={theme}>{component}</Context.Provider>)

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

const Text = createStylinComponent<'div', Theme, TextStyleProps>({
  element: 'div',
  displayName: 'Text',
  defaultStyleProps: {
    size: 'md',
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
    <Text styles={() => ({ fontSize: '15px' })}>Hey there!</Text>
  )
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

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
