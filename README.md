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

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
