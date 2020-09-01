import React from 'react'
import ReactDOM from 'react-dom'

import { Styler, StyleSheet } from '@sambs/react-stylin'

import {
  Box,
  Button,
  Divider,
  GridRowGuide,
  Heading,
  Link,
  Row,
  Stack,
  Text,
  StyleContextProvider,
  theme,
} from '@sambs/react-stylin-components'

const App = () => (
  <StyleContextProvider theme={theme}>
    <StyleSheet
      styles={({ theme }) => `
        * {
          box-sizing: border-box;
        }
        *:focus {
          outline: none;
        }
        html {
          color: ${theme.colors.bodyText};
          font-family: ${theme.fonts.primary.fontFamily};
        }
      `}
    />
    <GridRowGuide disabled>
      <Box
        styles={({ theme }) => ({
          padding: `${theme.gridRowHeight * 6}px`,
          margin: '0 auto',
          maxWidth: '600px',
        })}
      >
        <Stack spacing={8}>
          <Heading size="xl">Stylin Components Example</Heading>
          <Text>
            Some inspiration has been taken from Braid. A key principle is the
            separation between layout and regular components. Regular components
            do not include white space.
          </Text>
          <Divider />
          <Text size="sm">
            Sometimes you just want to add a divider like the one above.
          </Text>
          <Styler
            styles={({ theme }) => ({
              color: theme.colors.divider,
            })}
          >
            {(style) => (
              <span style={style}>
                I'm an arbitrary element styled by a Styler component.
              </span>
            )}
          </Styler>
          <Row align="middle" spacing={2}>
            <Button
              styles={({ theme }, { focus, hover }, defaults) => ({
                ...defaults,
                borderRadius: theme.borderRadius.medium,
                backgroundColor: hover
                  ? 'hsl(204, 94%, 40%)'
                  : 'hsl(204, 94%, 45%)',
                boxShadow: focus ? '0 0 0 3px rgba(66,153,225,0.6)' : undefined,
              })}
            >
              <Text>Submit</Text>
            </Button>
            <Link href="#">
              <Text>Cancel</Text>
            </Link>
          </Row>
        </Stack>
      </Box>
    </GridRowGuide>
  </StyleContextProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
