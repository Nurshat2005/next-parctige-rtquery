// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images3.alphacoders.com',
      'images7.alphacoders.com',
      'unsplash.com',
      'cdn.pixabay.com',
      'images.unsplash.com',
      'media.giphy.com',
      'i.imgur.com',
      'cdn.dribbble.com',
      'image.shutterstock.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      's3.amazonaws.com',
      'cdn.cloudflare.steamstatic.com',
      'i.ytimg.com',
      'img.youtube.com',
      'pbs.twimg.com',
      'cdn.discordapp.com',
      'www.gravatar.com',
      'api.lorem.space',
    ],
  },
};

export default nextConfig;
