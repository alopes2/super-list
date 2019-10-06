
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#942da6',
    },
    secondary: {
      main: '#3fa62d',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ffff8d',
    },
  },
});

export default theme;