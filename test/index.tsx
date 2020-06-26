import * as React from 'react'
import { ContextContext, ThemeContext, Box, createStylinElement } from 'stylin'
import { create as createRenderer } from 'react-test-renderer'

export const theme = {
  colors: {
    primary: 'red',
    secondary: 'green',
  },
  size: {
    1: '2px',
    2: '4px',
    3: '8px',
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

declare module 'stylin' {
  export interface Theme {
    colors: {
      primary: string
      secondary: string
    }
    size: {
      1: string
      2: string
      3: string
    }
    text: {
      lg: React.CSSProperties
      md: React.CSSProperties
      sm: React.CSSProperties
    }
  }

  export interface Context {
    screenSize: 'sm' | 'md' | 'lg'
  }
}

const createRendererWithContext = (component: JSX.Element) =>
  createRenderer(
    <ContextContext.Provider value={{ screenSize: 'sm' }}>
      <ThemeContext.Provider value={theme}>{component}</ThemeContext.Provider>
    </ContextContext.Provider>
  )

test('Box', () => {
  const component = createRendererWithContext(
    <Box
      as="div"
      styles={({ theme }) => ({
        ...theme.text.lg,
        border: '1px solid red',
        paddingTop: theme.size[3],
      })}
    >
      Hell Yeah!
    </Box>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

const Alert = createStylinElement({
  element: 'div',
  displayName: 'Alert',
  defaultProps: { role: 'alert' },
  defaultStyles: ({ theme }) => ({
    background: theme.colors.primary,
  }),
})

test('Custom Element with default props', () => {
  const component = createRendererWithContext(<Alert>Uh Oh!</Alert>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

type TextStyleProps = {
  size: 'sm' | 'md' | 'lg'
}

const Text = createStylinElement<'div', TextStyleProps>({
  element: 'div',
  displayName: 'Text',
  defaultStyleProps: {
    size: 'md',
  },
  defaultStyles: ({ theme, props }) => theme.text[props.size],
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
