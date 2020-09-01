import React from 'react'
import { useStylin, StyleResolver } from '@sambs/react-stylin'
import { Theme } from './context'
import { useFocusState, useHoverState } from './utils'

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  styles?: ButtonStyleResolver
  variant?: keyof Theme['buttons']
}

export type ButtonStyleParams = {
  hover: boolean
  focus: boolean
  variant: keyof Theme['buttons']
}

export type ButtonStyleResolver = StyleResolver<ButtonStyleParams>

export const buttonStyles: ButtonStyleResolver = (
  { theme: { buttons } },
  { variant }
) => ({
  border: 0,
  background: 'none',
  cursor: 'pointer',
  ...buttons[variant],
})

export const Button: React.FC<ButtonProps> = ({
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  styles = buttonStyles,
  variant = 'default',
  ...props
}) => {
  const [hover, hoverHandlers] = useHoverState<HTMLButtonElement>({
    onMouseEnter,
    onMouseLeave,
  })
  const [focus, focusHandlers] = useFocusState<HTMLButtonElement>({
    onBlur,
    onFocus,
  })

  const style = useStylin({ focus, hover, variant }, styles)

  return React.createElement('button', {
    style,
    ...hoverHandlers,
    ...focusHandlers,
    ...props,
  })
}

Button.displayName = 'Button'
