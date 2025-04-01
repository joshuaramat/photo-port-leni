/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/layouts/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9C8B7E',
          dark: '#8A7B6E',
          light: '#B3A69A',
        },
        secondary: {
          DEFAULT: '#6b7280',
          dark: '#4b5563',
        },
        error: '#ef4444',
        success: '#22c55e',
        text: {
          DEFAULT: '#1f2937',
          light: '#6b7280',
        },
        background: {
          DEFAULT: '#ffffff',
          alt: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
} 