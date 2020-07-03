import React from 'react'

export const theme = {
  gridRowHeight: 4,
  fonts: {
    primary: {
      fontFamily: 'Lato',
      offsetTop: 0.17,
      offsetBottom: 0.11,
    },
  },
  typography: {
    fontFamily: 'Lato',
    capHeight: 0.72,
    descenderHeight: 0.11,
    offsetTop: 0.17,
    offsetBottom: 0.11,
  },
  colors: {
    primary: 'red',
    secondary: 'green',
  },
  text: {
    xl: {
      fontSize: 32,
      rowSpan: 12,
    },
    lg: {
      fontSize: 24,
      rowSpan: 8,
    },
    md: {
      fontSize: 16,
      rowSpan: 6,
    },
    sm: {
      fontSize: 14,
      rowSpan: 5,
    },
  },
}

export type Theme = typeof theme

export const ThemeContext = React.createContext(theme)
