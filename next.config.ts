import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zgopvdlnfvdfplmwdvaa.supabase.co",
        port: "",
        pathname: "/**",
      },
      // add more domains if needed, each as a separate object
    ],
  },
};

export default nextConfig;
