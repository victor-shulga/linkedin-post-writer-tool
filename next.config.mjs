/** @type {import('next').NextConfig} */
// Served under victorshulga.com/free-tools/linkedin-post-writer via Cloudflare proxy.
// basePath makes Next emit all routes/assets under this prefix; the env var lets
// client code build matching fetch() URLs for the API routes.
const basePath = "/free-tools/linkedin-post-writer";

const nextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
