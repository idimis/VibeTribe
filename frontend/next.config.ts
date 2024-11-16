import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Enable React Strict Mode for catching potential issues
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'], // Specify file extensions for pages
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL || 'http://localhost:3000/api', // Default API URL
  },
  compiler: {
    styledComponents: true, // Enable styled-components SSR support
  },
  images: {
    domains: ['example.com'], // External image domains
  },
  async redirects() {
    return [
      {
        source: '/old-route',  // Redirect from old route to new route
        destination: '/new-route',
        permanent: true,  // Permanent redirect (HTTP 301)
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Rewriting API URLs to external endpoints
        destination: 'https://external-api.com/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',  // Add headers for all requests
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',  // Security header
          },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    // Customize webpack configuration if necessary
    if (!isServer) {
      config.resolve.fallback = { fs: false }; // Handle 'fs' module in the browser
    }
    return config;
  },
};

export default nextConfig;
