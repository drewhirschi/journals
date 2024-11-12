/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dvnpzpdoekbdmpltqefb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/account/**",
      },
    ],
  },
};

module.exports = nextConfig;
