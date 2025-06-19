/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  basePath: '/nilp',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ullas.education.gov.in',
        port: '',
        pathname: '/nilp/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' https://ullas.education.gov.in http://localhost:3000;
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://www.youtube.com https://connect.facebook.net;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' blob: data: https://ullas.education.gov.in https://maps.gstatic.com https://www.youtube.com https://scontent.xx.fbcdn.net https://platform-lookaside.fbsbx.com  https://nilp-next.vercel.app;
              font-src 'self' https://fonts.gstatic.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              connect-src 'self' https://ullas.education.gov.in http://localhost:3000 https://maps.googleapis.com https://www.youtube.com https://graph.facebook.com;
              media-src 'self' https://www.youtube.com;
              frame-src 'self' https://www.youtube.com https://www.facebook.com https://www.google.com;
              upgrade-insecure-requests
            `.replace(/\n/g, ''),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
