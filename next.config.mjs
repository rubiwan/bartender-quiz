/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",

    images: {
        unoptimized: true,
    },
    basePath: "/bartender-quiz",
    assetPrefix: "/bartender-quiz/",
}

export default nextConfig
