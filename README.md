# Photo Portfolio Website

A modern, responsive photography portfolio website built with Astro, React, and Tailwind CSS. This project showcases a photographer's work with a focus on accessibility, performance, and user experience.

## 🚀 Features

- **Modern Tech Stack**
  - Astro for static site generation
  - React for interactive components
  - Tailwind CSS for styling
  - TypeScript for type safety

- **Performance Optimized**
  - Image optimization with lazy loading
  - CSS modules for scoped styling
  - Code splitting and lazy loading
  - Optimized asset delivery

- **Accessibility First**
  - WCAG 2.1 compliant
  - Keyboard navigation
  - Screen reader friendly
  - ARIA landmarks
  - Alt text for all images

- **Interactive Components**
  - Contact form with validation
  - Image gallery with hover effects
  - Responsive navigation
  - Dynamic content loading

## 📁 Project Structure

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

## 🛠️ Setup

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

## 🧪 Testing

The project includes comprehensive accessibility testing using Playwright and axe-core:

```bash
# Run all tests
npm run test

# Run accessibility tests only
npm run test:a11y

# Run tests with UI
npm run test:ui
```

## 🎨 Customization

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

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🔒 Security

- Form validation and sanitization
- Secure API endpoints
- Environment variable protection
- XSS prevention

## 📈 Performance

- Optimized image loading
- Code splitting
- Lazy loading of components
- Minimal JavaScript footprint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build/) for the static site framework
- [React](https://reactjs.org/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Playwright](https://playwright.dev/) for the testing framework
