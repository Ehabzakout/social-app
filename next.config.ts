import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
      hostname:'utfs.io'
    }]
  }
  /* config options here */
};

export default nextConfig;
