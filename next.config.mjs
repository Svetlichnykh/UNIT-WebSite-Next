/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

// @ts-check
// import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

// export default (phaseT) => {
//     const isDev = phaseT === PHASE_DEVELOPMENT_SERVER
//     /**
//      * @type {import('next').NextConfig}
//      */
//     const nextConfig = {
//         trailingSlash: true,
//         output: "export",
//         images: {
//             unoptimized: true,
//         },
//         assetPrefix: isDev ? undefined : 'https://cdn.mydomain.com',
//     }
//     return nextConfig
// }
