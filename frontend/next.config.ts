import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Aktifkan mode ketat React
  swcMinify: true,        // Gunakan SWC untuk minifikasi (lebih cepat dan efisien)
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'], // Tentukan ekstensi halaman yang digunakan
  env: {
    // Contoh environment variable, Anda bisa menambahkannya sesuai kebutuhan
    CUSTOM_API_URL: process.env.CUSTOM_API_URL || 'http://localhost:3000/api', // API URL sebagai default
  },
  compiler: {
    styledComponents: true, // Aktifkan styled-components untuk SSR dengan lebih baik
  },
  images: {
    domains: ['example.com'], // Jika menggunakan gambar dari domain eksternal
  },
  async redirects() {
    return [
      {
        source: '/old-route',  // Pengalihan URL lama ke URL baru
        destination: '/new-route',
        permanent: true,  // Pengalihan permanen (HTTP 301)
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Contoh untuk menulis ulang URL API
        destination: 'https://external-api.com/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',  // Menambahkan header untuk semua request
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',  // Header untuk keamanan
          },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    // Kustomisasi webpack jika perlu
    if (!isServer) {
      config.resolve.fallback = { fs: false }; // Menangani fallback jika menggunakan 'fs' di browser
    }
    return config;
  },
};

export default nextConfig;
