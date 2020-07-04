import React from 'react'

const borderRadius = {
  small: '2px',
  medium: '5px',
  large: '20px',
}

export const theme = {
  gridRowHeight: 4,
  fonts: {
    primary: {
      fontFamily: 'Lato',
      offsetTop: 0.15,
      offsetBottom: 0.1,
    },
  },
  colors: {
    primary: 'red',
    secondary: 'green',
    divider: '#eee',
  },
  text: {
    xl: {
      fontSize: 8,
      lineHeight: 10,
    },
    lg: {
      fontSize: 6,
      lineHeight: 7,
    },
    md: {
      fontSize: 4,
      lineHeight: 6,
    },
    sm: {
      fontSize: 3.5,
      lineHeight: 5,
    },
    xs: {
      fontSize: 3,
      lineHeight: 4,
    },
  },
  links: {
    default: {
      color: 'blue',
      textDecoration: 'none',
    },
  },
  buttons: {
    default: {
      color: 'white',
      backgroundColor: 'green',
      padding: '8px 20px',
      borderRadius: borderRadius.small,
    },
  },
  borderRadius,
}

export type Theme = typeof theme

export const ThemeContext = React.createContext(theme)
