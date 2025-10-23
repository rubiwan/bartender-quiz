// next.config.mjs
/** @type {import('next').NextConfig} */

const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "bartender-quiz" // ej: "/bartender-quiz"

const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  // Necesario SOLO si publicas como Project Page
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath ? `${repoBasePath}/` : undefined,
}

export default nextConfig
