import React from 'react'
import { StyleResolver, useStylin } from 'stylin'
import { Theme, ThemeContext } from './theme'

type StackStyleProps = {
  spacing?: number
  // spacing: keyof Theme['size']
}

type StackProps = StackStyleProps & {
  styles?: StyleResolver<Theme, StackStyleProps>
}

export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 1,
  styles,
}) => {
  const style = useStylin(ThemeContext, { spacing }, styles)
  const theme = React.useContext(ThemeContext)

  return (
    <div style={style}>
      {React.Children.map(children, (child, index) => (
        <>
          {index != 0 && (
            <div style={{ height: `${spacing * theme.gridRowHeight}px` }} />
          )}
          {child}
        </>
      ))}
    </div>
  )
}
