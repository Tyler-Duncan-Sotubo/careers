/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "edtech-images.s3.amazonaws.com",
      "centahr.s3.eu-west-3.amazonaws.com",
      "centahr.s3.amazonaws.com",
      "res.cloudinary.com",
    ], // ✅ Add your image hostname here
  },
};

export default nextConfig;
