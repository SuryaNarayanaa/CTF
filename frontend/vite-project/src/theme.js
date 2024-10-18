// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100', // Background color for the body
        color: 'gray.800', // Text color for the body
      },
    },
  },
});

export default theme;
