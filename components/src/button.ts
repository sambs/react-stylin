import React from 'react'
import { useStylin, StyleResolver } from 'stylin'
import { StyleContext, StyleContextType, Theme } from './context'
import { useFocusState, useHoverState } from './utils'

type ButtonStyleProps = {
  variant?: keyof Theme['buttons']
}

type ButtonStyleParams = ButtonStyleProps & { hover: boolean; focus: boolean }

type ButtonProps = ButtonStyleProps &
  JSX.IntrinsicElements['button'] & {
    styles?: ButtonStyleResolver
  }

type ButtonStyleResolver = StyleResolver<StyleContextType, ButtonStyleParams>

const defaultButtonStyles: ButtonStyleResolver = (
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
  styles,
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
  const style = useStylin(
    StyleContext,
    { focus, hover, variant },
    defaultButtonStyles,
    styles
  )
  return React.createElement('button', {
    style,
    ...hoverHandlers,
    ...focusHandlers,
    ...props,
  })
}

Button.displayName = 'Button'
