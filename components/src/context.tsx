import React from 'react'
import { StyleContext } from '@sambs/react-stylin'

const borderRadius = {
  small: '2px',
  medium: '5px',
  large: '20px',
}

export const theme = {
  breakpoints: [320, 780, 1200],
  gridRowHeight: 4,
  fonts: {
    primary: {
      fontFamily: 'Lato',
      offsetTop: 0.15,
      offsetBottom: 0.1,
    },
  },
  colors: {
    bodyText: '#333',
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

declare module '@sambs/react-stylin' {
  export interface StyleContextType {
    theme: Theme
    screenWidth: number
    breakpoint: number
  }
}

export const StyleContextProvider: React.FC<{ theme: Theme }> = ({
  children,
  theme,
}) => {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)

  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const breakpoint = theme.breakpoints.reduce((current, breakpoint) => {
    return screenWidth > breakpoint ? current + 1 : current
  }, 0)

  return (
    <StyleContext.Provider value={{ theme, screenWidth, breakpoint }}>
      {children}
    </StyleContext.Provider>
  )
}
