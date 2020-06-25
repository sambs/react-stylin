import * as React from 'react'

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
      4: string
      5: string
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
