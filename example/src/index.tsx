import React from 'react'
import ReactDOM from 'react-dom'
import { Box, Stack, Text, ThemeContext, theme } from 'stylin-components'

const App = () => (
  <ThemeContext.Provider value={theme}>
    <Stack spacing={4}>
      <Box styles={() => ({ background: '#f7f7f7' })}>
        <Text size="xl">Stylin Components Example</Text>
      </Box>
      <Box styles={() => ({ background: '#f7f7f7' })}>
        <Text>And another</Text>
      </Box>
      <Box styles={() => ({ background: '#f7f7f7' })}>
        <Text size="xl">Hey</Text>
      </Box>
      <Text>I'm outside of the box.</Text>
    </Stack>
  </ThemeContext.Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
