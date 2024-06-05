/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname :'camo.githubusercontent.com'
        }]
    }
};

export default nextConfig;
