import * as React from 'react'
import { create as createRenderer } from 'react-test-renderer'
import { StyleContext } from '@sambs/react-stylin'

interface Theme {
  colors: {
    primary: string
    secondary: string
  }
  text: {
    lg: {
      fontSize: string
    }
    md: {
      fontSize: string
    }
    sm: {
      fontSize: string
    }
  }
}

export const theme: Theme = {
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

declare module '@sambs/react-stylin' {
  export interface StyleContextType {
    theme: Theme
  }
}

export const createRendererWithContext = (component: JSX.Element) =>
  createRenderer(
    <StyleContext.Provider value={{ theme }}>{component}</StyleContext.Provider>
  )
