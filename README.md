# VW React Challenge - DataTable Application

**Developer:** Vicente Losada

## Project Overview

This application implements a DataTable component with full CRUD operations, search functionality, and sorting capabilities as part of the VW DIGITAL HUB Frontend technical challenge.

The application features a simple car management system built with Next.js, TypeScript, and React Query, demonstrating clean code principles, responsive design, and testing.

## Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Behaviors Documentation

As part of the development process, a comprehensive behaviors specification has been created in the `BEHAVIORS.md` file. This document defines the expected behaviors of the application using Given-When-Then scenarios, covering:

- Core data management operations
- CRUD functionality
- Search and sorting features
- State management requirements
- UI/UX interactions and error handling
- Essential edge cases

These behaviors serve as a foundation for both implementation and testing, ensuring all requirements are clearly defined and testable.

## Implemented Features

- **Car Listing**: Display a list of cars in a table
- **Car Creation**: Form with validation for adding new cars
- **Car Deletion**: Remove cars from the list with confirmation
- **Search Functionality**: Search across different car fields
- **Table Sorting**: Column-based sorting with visual indicators

## Future Improvements

### Pending Features

- **Update Functionality**: Edit car entries with inline editing or modal form
- **Unit Testing for Design System**: Storybook integration for component documentation and testing

### Proposed Implementation

- **Edit Feature**: Add edit icon button next to delete button, opening a pre-populated modal using similar patterns to the create modal
- **Storybook Setup**: Component documentation and isolated testing environment for the design system components

## AI Tool Usage Documentation

This project was developed with assistance from GitHub Copilot. I developed first components and hooks, but them when I already established the patterns, I used agent mode with Claude Sonnet 4 for creating some design system components, react query hooks and some test cases. I also used code completion suggestions with GPT 4.1. The token values in the design system theme were also generated with the help of AI, as well as some styles in components.

## Technology Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Programming Language**: TypeScript
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: CSS Modules with custom design system tokens using CSS variables
- **Form Management**: React Hook Form for form state and validation with zod
- **API**: JSON Server
- **Testing**: Jest with React Testing Library and MSW
- **Linting**: ESLint with Next.js configuration
- **Icons**: Phosphor Icons using react-icons

## Design System

### Theme

The look and feel of the application is defined in `globals.css`. There are different design tokens that are reused throughout the application.
Also, custom media queries are defined in `custom-media.css`

### Core Components

The project includes a design system with reusable components:

- Table
- Container
- Modal
- Button
- IconButton
- Loader
- TextInput
- Select

## Performance Optimizations

The application has an overall good performance, so I did not focus heavily on optimizations. However, I would consider the following strategies for further improvements:

- Code Splitting and Lazy Loading: Using `dynamic` from `next/dynamic`. I would use it for modal components.
- Optimistic Update: Immediate UI feedback for mutations

There are some optimization that comes with the used stack. I did not have to implement them manually, but it is worth mentioning:

- Query Memoization: React Query caching
- Bundle Optimization: Tree shaking and minification. This is configured out of the box with Next.js.

## Accessibility

- ARIA Labels: Comprehensive ARIA implementation
- Keyboard Navigation: Full keyboard accessibility
- Screen Reader Support: Semantic HTML and proper labeling
- Focus Management: Logical focus flow and trapped focus in modals
- Color Contrast: WCAG AA compliant color palette

### Audit tools

- AXE: Accessibility auditing chrome extension
- Lighthouse: Performance and accessibility audits

## Testing Strategy

### Unit Testing

The project includes unit tests for utils using Jest.

### Integration Testing

The project includes integration tests for user flows using React Testing Library and MSW. The approach focuses on predefined behaviors that map testing cases. Also TDD was used.

## Git Strategy

The project follows a gitflow workflow.

For feature implementation:

- Create a feature branch from `develop`
- Create a pull request for code review
- Merge into `develop` after approval
- Delete the feature branch
- Merge changes into `main` for production

For hotfixes:

- Create a hotfix branch from `main`
- Apply fixes
- Merge into `main` and `develop`
- Delete the hotfix branch

Note: For this challenge, to work faster, the gitflow process was not always strictly followed.
