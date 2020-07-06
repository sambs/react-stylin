import React from 'react'
import ReactDOM from 'react-dom'

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
  Styler,
  StyleContextProvider,
  theme,
} from 'stylin-components'

const App = () => (
  <StyleContextProvider theme={theme}>
    <style
      dangerouslySetInnerHTML={{
        __html: `
          * {
            box-sizing: border-box;
          }
          *:focus {
            outline: none;
          }
          `,
      }}
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
            <Styler
              styles={({ theme }) => ({
                color: theme.colors.primary,
              })}
            >
              {(style) => <span style={style}>Red Me</span>}
            </Styler>
          </Row>
        </Stack>
      </Box>
    </GridRowGuide>
  </StyleContextProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
