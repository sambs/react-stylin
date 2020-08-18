import * as React from 'react'
import { StyleParams, StyleResolver, useStylin } from './core'

type Elements = {
  a: HTMLAnchorElement
  abbr: HTMLElement
  address: HTMLElement
  area: HTMLAreaElement
  article: HTMLElement
  aside: HTMLElement
  audio: HTMLAudioElement
  b: HTMLElement
  base: HTMLBaseElement
  bdi: HTMLElement
  bdo: HTMLElement
  big: HTMLElement
  blockquote: HTMLElement
  body: HTMLBodyElement
  br: HTMLBRElement
  button: HTMLButtonElement
  canvas: HTMLCanvasElement
  caption: HTMLElement
  cite: HTMLElement
  code: HTMLElement
  col: HTMLTableColElement
  colgroup: HTMLTableColElement
  data: HTMLDataElement
  datalist: HTMLDataListElement
  dd: HTMLElement
  del: HTMLElement
  details: HTMLElement
  dfn: HTMLElement
  dialog: HTMLDialogElement
  div: HTMLDivElement
  dl: HTMLDListElement
  dt: HTMLElement
  em: HTMLElement
  embed: HTMLEmbedElement
  fieldset: HTMLFieldSetElement
  figcaption: HTMLElement
  figure: HTMLElement
  footer: HTMLElement
  form: HTMLFormElement
  h1: HTMLHeadingElement
  h2: HTMLHeadingElement
  h3: HTMLHeadingElement
  h4: HTMLHeadingElement
  h5: HTMLHeadingElement
  h6: HTMLHeadingElement
  head: HTMLHeadElement
  header: HTMLElement
  hgroup: HTMLElement
  hr: HTMLHRElement
  html: HTMLHtmlElement
  i: HTMLElement
  iframe: HTMLIFrameElement
  img: HTMLImageElement
  input: HTMLInputElement
  ins: HTMLModElement
  kbd: HTMLElement
  keygen: HTMLElement
  label: HTMLLabelElement
  legend: HTMLLegendElement
  li: HTMLLIElement
  link: HTMLLinkElement
  main: HTMLElement
  map: HTMLMapElement
  mark: HTMLElement
  menu: HTMLElement
  menuitem: HTMLElement
  meta: HTMLMetaElement
  meter: HTMLElement
  nav: HTMLElement
  noindex: HTMLElement
  noscript: HTMLElement
  object: HTMLObjectElement
  ol: HTMLOListElement
  optgroup: HTMLOptGroupElement
  option: HTMLOptionElement
  output: HTMLElement
  p: HTMLParagraphElement
  param: HTMLParamElement
  picture: HTMLElement
  pre: HTMLPreElement
  progress: HTMLProgressElement
  q: HTMLQuoteElement
  rp: HTMLElement
  rt: HTMLElement
  ruby: HTMLElement
  s: HTMLElement
  samp: HTMLElement
  slot: HTMLSlotElement
  script: HTMLScriptElement
  section: HTMLElement
  select: HTMLSelectElement
  small: HTMLElement
  source: HTMLSourceElement
  span: HTMLSpanElement
  strong: HTMLElement
  style: HTMLStyleElement
  sub: HTMLElement
  summary: HTMLElement
  sup: HTMLElement
  table: HTMLTableElement
  template: HTMLTemplateElement
  tbody: HTMLTableSectionElement
  td: HTMLTableDataCellElement
  textarea: HTMLTextAreaElement
  tfoot: HTMLTableSectionElement
  th: HTMLTableHeaderCellElement
  thead: HTMLTableSectionElement
  time: HTMLElement
  title: HTMLTitleElement
  tr: HTMLTableRowElement
  track: HTMLTrackElement
  u: HTMLElement
  ul: HTMLUListElement
  var: HTMLElement
  video: HTMLVideoElement
  wbr: HTMLElement
  webview: HTMLWebViewElement
}

type ElementName = keyof Elements

type ElementProps<E extends ElementName> = Omit<
  JSX.IntrinsicElements[E],
  'ref' | 'style'
>

type StylinComponentProps<
  E extends ElementName,
  C,
  P extends StyleParams
> = ElementProps<E> & {
  styles?: StyleResolver<C, P>
  innerRef?: React.Ref<Elements[E]>
} & Partial<P>

type CreateStylinComponentParams<
  E extends ElementName,
  C,
  P extends StyleParams
> = {
  defaultProps?: ElementProps<E>
  defaultStyles?: StyleResolver<C, P>
  defaultStyleProps?: P
  displayName?: string
  element: E
  context: React.Context<C>
}

export const createStylinComponent = <
  E extends ElementName,
  C,
  P extends StyleParams
>({
  defaultProps,
  defaultStyles,
  defaultStyleProps,
  displayName = 'StylinComponent',
  element,
  context,
}: CreateStylinComponentParams<E, C, P>) => {
  const component: React.FC<StylinComponentProps<E, C, P>> = (props) => {
    const styleProps: Partial<P> = {}
    const elemProps: Partial<React.ComponentProps<E>> = {}

    for (const prop in defaultStyleProps) {
      if (prop in props) {
        styleProps[prop] = props[prop]
      } else {
        styleProps[prop] = defaultStyleProps[prop]
      }
    }

    for (const prop in props) {
      if (defaultStyleProps && defaultStyleProps.hasOwnProperty(prop)) continue
      if (prop == 'styles' || prop == 'innerRef') continue
      // @ts-ignore
      elemProps[prop] = props[prop]
    }

    const style = useStylin(
      context,
      styleProps as Required<P>,
      defaultStyles,
      props.styles
    )

    return React.createElement(element, {
      ...defaultProps,
      ...elemProps,
      ref: props.innerRef,
      style,
    })
  }

  component.displayName = displayName

  return component
}
