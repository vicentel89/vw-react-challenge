# Technical Documentation

## Folder Structure

The application follows a feature-based architecture with clear separation of concerns:

```
src/app/
├── (cars)/              # Car management feature module
│   ├── _api/           # API hooks and data fetching logic
│   ├── _components/    # Feature-specific components
│   ├── _utils/        # Feature-specific utilities
│   └── __tests__/     # Feature integration tests
├── _common/            # Shared application code
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom reusable hooks
│   └── test-utils/    # Testing utilities
└── _lib/              # Third-party library configurations
```

## Design System

### Custom CSS Token System

The project implements a comprehensive design system using CSS custom properties (CSS variables) defined in `globals.css`. This approach provides:

- **Design Consistency**: Centralized color palettes, typography scales, and spacing units ensure visual consistency across all components
- **Maintainability**: Single source of truth for design tokens enables easy look and feel updates
- **Performance**: No JavaScript overhead for style calculations, leveraging native CSS capabilities

### CSS Module

The styling architecture uses CSS Modules with specific conventions:

- **Component-scoped styles**: Each component has its own `.module.css` file preventing style conflicts
- **Design token integration**: All components reference global design tokens for consistency
- **Responsive design**: Mobile-first approach with custom media queries defined in `custom-media.css`

## State Management

### React Query

The application uses React Query (TanStack Query) for server state management. This application is a great use case for React Query because its state is linked to server data, allowing for efficient data fetching, caching, and global access.

### Local State Management

For local state management, `useState` is used for simplicity.
