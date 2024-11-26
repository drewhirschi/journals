/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mharsjdgfkzeiszozejf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/account/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54321",
        pathname: "/storage/v1/object/sign/account/**",
      },
    ],
  },
};

module.exports = nextConfig;
