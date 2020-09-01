# Stylin

Another CSS-in-JS library. This project is WIP. Feedback welcome :)

## Motivations and Principles

  1. Simplicity of tooling. No Babel or Webpack requirements.
  2. Theming. Ideally it should be easier to use values from the theme than to use custom properties.
  3. Easy methods to create component based design systems.
  4. Easily override component styles without requiring creation of a new component.

Components are great for encapsulating patterns where html and css needs are intertwined.

## Implementation

We're using inline styles. Some of the traditional downsides of inline styles include lack of support for:

  - psuedo selectors
  - media queries
  - keyframes
