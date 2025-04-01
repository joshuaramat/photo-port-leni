# Photo Portfolio Website

A photography portfolio website built with Astro, React, and Tailwind CSS. This project provides a simple, accessible way to showcase photography work online.

## Features

- Static site generation with Astro
- Interactive components with React
- Responsive design with Tailwind CSS
- Accessibility testing with Playwright
- Image optimization and lazy loading
- Contact form with validation

## Project Structure

```
photo-port/
├── src/
│   ├── components/
│   │   ├── Landing/          # Main landing page components
│   │   │   ├── Hero.astro    # Hero section
│   │   │   ├── About.astro   # About section
│   │   │   ├── Services.astro # Services section
│   │   │   ├── Gallery.astro # Portfolio gallery
│   │   │   ├── Contact.astro # Contact section
│   │   │   └── Footer.astro  # Footer component
│   │   └── React/           # React components
│   │       └── ContactForm.tsx # Interactive contact form
│   ├── layouts/             # Layout components
│   │   └── Layout.astro     # Main layout wrapper
│   ├── pages/              # Astro pages
│   │   └── index.astro     # Home page
│   └── utils/              # Utility functions
│       └── images.ts       # Image handling utilities
├── public/                 # Static assets
│   └── images/            # Image assets
│       ├── hero/         # Hero section images
│       ├── about/        # About section images
│       ├── services/     # Services section images
│       └── gallery/      # Gallery images
├── tests/                # Test files
│   └── accessibility.spec.ts # Accessibility tests
└── astro.config.mjs      # Astro configuration
```

## Setup

1. **Prerequisites**
   - Node.js >=18.17.1
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]
   cd photo-port

   # Install dependencies
   npm install
   ```

3. **Development**
   ```bash
   # Start the development server
   npm run dev
   ```

4. **Building**
   ```bash
   # Build for production
   npm run build

   # Preview production build
   npm run preview
   ```

## Testing

The project includes accessibility testing using Playwright and axe-core:

```bash
# Run all tests
npm run test

# Run accessibility tests only
npm run test:a11y

# Run tests with UI
npm run test:ui
```

## Customization

1. **Images**
   - Place your images in the appropriate folders under `public/images/`
   - Update image paths in the components
   - Use the `getImageConfig` utility for consistent image handling

2. **Content**
   - Update text content in the respective `.astro` files
   - Modify the contact form in `ContactForm.tsx`
   - Update services and gallery items in their components

3. **Styling**
   - Modify Tailwind classes in the components
   - Update global styles in `src/styles/global.css`
   - Customize theme colors in `tailwind.config.mjs`

## Changelog

### v1.0.0 (Initial Release)
- Basic landing page with Hero, About, Services, Gallery, and Contact sections
- Responsive design for desktop, tablet, and mobile
- Contact form with basic validation
- Image optimization and lazy loading
- Accessibility testing setup
- Basic SEO optimization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Astro](https://astro.build/) for the static site framework
- [React](https://reactjs.org/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Playwright](https://playwright.dev/) for the testing framework
