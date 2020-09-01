import React from 'react'
import { StyleContext, StyleResolver, useStylin } from '@sambs/react-stylin'
import { px } from './utils'

type RowStyleProps = {
  align?: 'top' | 'middle' | 'bottom'
  spacing?: number
  nowrap?: boolean
}

type RowProps = RowStyleProps & {
  styles?: StyleResolver<RowStyleProps>
}

const alignMap = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
}

const defaultRowStyles: StyleResolver<Required<RowStyleProps>> = (
  { theme },
  { align, nowrap, spacing }
) => ({
  margin: px(spacing * -0.5 * theme.gridRowHeight - 1),
  display: 'flex',
  alignItems: alignMap[align],
  flexWrap: nowrap ? 'nowrap' : 'wrap',
})

export const Row: React.FC<RowProps> = ({
  children,
  align = 'middle',
  nowrap = false,
  spacing = 1,
  styles,
}) => {
  const style = useStylin({ align, nowrap, spacing }, defaultRowStyles, styles)
  const { theme } = React.useContext(StyleContext)

  return (
    <div style={{ padding: '1px' }}>
      <div style={style}>
        {React.Children.map(children, (child) => (
          <div style={{ padding: `${spacing * 0.5 * theme.gridRowHeight}px` }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

Row.displayName = 'Row'
