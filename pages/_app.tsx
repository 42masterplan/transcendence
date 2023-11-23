import '@/styles/globals.css';
import type {AppProps} from 'next/app';

import {ThemeProvider} from '@/components/theme/theme-provider';
import {CookiesProvider} from 'react-cookie';
import Layout from '@/components/layout/Layout';

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Layout>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </Layout>
    </ThemeProvider>
  );
}
