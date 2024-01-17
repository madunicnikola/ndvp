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
    }
};

module.exports = nextConfig;