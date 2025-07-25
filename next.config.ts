import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "images.pexels.com",
      // ajoute d'autres domaines ici si besoin
    ],
  },
};

export default nextConfig;
