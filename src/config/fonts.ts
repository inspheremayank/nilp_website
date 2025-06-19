// import { Noto_Sans, Work_Sans } from 'next/font/google';

// /* Primary font is used as local font */
// export const primaryFont = Noto_Sans({
//   weight: ['300', '400', '600', '700', '900'],
//   subsets: ['latin'],
//   variable: '--font-primary',
// });

// /* Secondary font is used as local font */
// export const SecondaryFont = Work_Sans({
//   weight: ['300','400', '500','600', '700'],
//   subsets: ['latin'],
//   variable: '--font-secondary',
// });


import localFont from 'next/font/local';

export const primaryFont = localFont({
  src: [
    {
      path: './fonts/NotoSans-Regular.woff',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-primary'
})
