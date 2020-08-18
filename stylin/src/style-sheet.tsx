import * as React from 'react'

export type StyleSheetResolver<C> = (context: C) => string

export type StyleSheetProps<C> = {
  styles: StyleSheetResolver<C>
}

export const createStyleSheet = <C,>(context: React.Context<C>) => {
  const StyleSheet = ({ styles }: StyleSheetProps<C>) => {
    const contextValue = React.useContext(context)
    const rules = styles(contextValue)
    return <style dangerouslySetInnerHTML={{ __html: rules }} />
  }
  return StyleSheet
}
