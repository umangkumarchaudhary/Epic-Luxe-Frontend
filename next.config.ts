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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Add more domains (e.g., for S3, Cloudinary, etc.) as needed
    ],
  },
};

export default nextConfig;
