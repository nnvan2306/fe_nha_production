/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8080",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.vietqr.io",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "script.googleusercontent.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
