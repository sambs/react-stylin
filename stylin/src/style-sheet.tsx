import * as React from 'react'
import { StyleContext, StyleContextType } from './core'

export type StyleSheetResolver<
  C extends StyleContextType = StyleContextType
> = (context: C) => string

export type StyleSheetProps<C extends StyleContextType = StyleContextType> = {
  styles: StyleSheetResolver<C>
}

export const StyleSheet = ({ styles }: StyleSheetProps) => {
  const contextValue = React.useContext(StyleContext)
  const rules = styles(contextValue)
  return <style dangerouslySetInnerHTML={{ __html: rules }} />
}
