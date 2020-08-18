import * as React from 'react'
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

export const Context = React.createContext(theme)

export const createRendererWithContext = (component: JSX.Element) =>
  createRenderer(<Context.Provider value={theme}>{component}</Context.Provider>)
