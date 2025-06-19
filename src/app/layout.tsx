export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import 'slick-carousel/slick/slick.css';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/Layout/ThemeProvider';
import AppContextProvider from '@/context/AppContext';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import Accessibility from '@/components/Layout/Accessibility';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: '',
  description: '',
  icons: {
    icon: 'https://ullas.education.gov.in/nilp/images/favicon/favicon.ico',
  },
  openGraph: {
    images: 'https://ullas.education.gov.in/nilp/images/meta_img.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <>
      <html lang={locale} className="light" style={{'colorScheme':'light'}} suppressHydrationWarning={true}>
        <body className="app-mainWrapper" suppressHydrationWarning={true}>
          <NextIntlClientProvider messages={messages}>
            <AppContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Accessibility />
                {/* <Header /> */}
                <ErrorBoundary>
                {children}
                </ErrorBoundary>
                <Footer />
              </ThemeProvider>
            </AppContextProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
