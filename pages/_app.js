import '../_src/assets/styles/globals.scss';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material';
import { wrapper } from '../_src/store/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6600',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => ({
  pageProps: {
    // Call page-level getInitialProps
    // DON'T FORGET TO PROVIDE STORE TO PAGE
    ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
    // Some custom thing for all pages
    pathname: ctx.pathname,
  },
}));

MyApp.defaultProps = {
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
  router: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
