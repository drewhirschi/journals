/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dvnpzpdoekbdmpltqefb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/user/**",
      },
    ],
  },
};

module.exports = nextConfig;
