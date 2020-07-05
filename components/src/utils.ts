import React from 'react'

export const px = (i: number) => `${i}px`

type FocusHandlers<E> = {
  onFocus: (event: React.FocusEvent<E>) => void
  onBlur: (event: React.FocusEvent<E>) => void
}

export const useFocusState = <E>({
  onFocus,
  onBlur,
}: Partial<FocusHandlers<E>>): [boolean, FocusHandlers<E>] => {
  const [focus, set] = React.useState(false)

  const handlers: FocusHandlers<E> = {
    onFocus: (event) => {
      set(true)
      if (onFocus) onFocus(event)
    },
    onBlur: (event) => {
      set(false)
      if (onBlur) onBlur(event)
    },
  }

  return [focus, handlers]
}

type HoverHandlers<E> = {
  onMouseEnter: (event: React.MouseEvent<E>) => void
  onMouseLeave: (event: React.MouseEvent<E>) => void
}

export const useHoverState = <E>({
  onMouseEnter,
  onMouseLeave,
}: Partial<HoverHandlers<E>>): [boolean, HoverHandlers<E>] => {
  const [hover, set] = React.useState(false)

  const handlers: HoverHandlers<E> = {
    onMouseEnter: (event) => {
      set(true)
      if (onMouseEnter) onMouseEnter(event)
    },
    onMouseLeave: (event) => {
      set(false)
      if (onMouseLeave) onMouseLeave(event)
    },
  }

  return [hover, handlers]
}
