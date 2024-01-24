/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [
            {
                source: '/',
                destination: '/index.html',
            },
        ]
    },
    images: {
        domains: ["firebasestorage.googleapis.com"],
    },
    reactStrictMode: false,
};

module.exports = nextConfig;