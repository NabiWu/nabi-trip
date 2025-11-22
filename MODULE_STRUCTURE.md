# Module Structure Documentation

This document describes the modular structure of the Nabi Trip application.

## Directory Structure

```
src/
├── components/          # React components
│   ├── shared/         # Reusable shared components
│   │   ├── Button.tsx  # Standardized button component
│   │   ├── Card.tsx    # Card components (Card, CardHeader, CardContent)
│   │   └── index.ts    # Shared components exports
│   ├── BottomNavigation.tsx
│   ├── AnimatedCodeBackground.tsx
│   └── ...
│
├── constants/          # Application constants
│   ├── typography.ts   # Font sizes, weights, text styles
│   ├── ui.ts           # UI constants (spacing, colors, sizes)
│   ├── weather.ts      # Weather-related constants
│   └── index.ts        # Centralized exports
│
├── utils/              # Utility functions
│   ├── classNames.ts   # className utility (like clsx)
│   ├── dateUtils.ts    # Date manipulation utilities
│   ├── backgroundUtils.ts
│   └── ...
│
├── styles/             # CSS styles
│   ├── typography.css  # Global typography styles
│   ├── animations.css  # Animation definitions
│   ├── mobile-optimizations.css
│   ├── background.css
│   └── mexico-theme.css
│
├── hooks/              # Custom React hooks
├── services/           # External service integrations
├── types/              # TypeScript type definitions
└── pages/              # Page components
```

## Constants

### Typography (`constants/typography.ts`)

Centralized typography system for consistent text sizing:

```typescript
import { typography, textStyles } from '../constants';

// Use predefined sizes
<div className={typography.sizes.heading.base}>Title</div>
<div className={typography.sizes.body.base}>Body text</div>

// Or use pre-composed styles
<h1 className={textStyles.pageTitle}>Page Title</h1>
```

**Available exports:**
- `typography.sizes` - Font sizes for body, headings, labels
- `typography.weights` - Font weights
- `typography.colors` - Text colors
- `textStyles` - Pre-composed text style combinations

### UI Constants (`constants/ui.ts`)

UI-related constants for spacing, sizing, and styling:

```typescript
import { ui, zIndex } from '../constants';

// Use spacing constants
<div className={ui.spacing.base}>

// Use border styles
<div className={ui.border.default}>

// Use z-index layers
<div className={`z-${zIndex.navigation}`}>
```

**Available exports:**
- `ui.bottomNav` - Bottom navigation configuration
- `ui.spacing` - Spacing utilities
- `ui.background` - Background styles
- `ui.border` - Border styles
- `ui.transition` - Transition utilities
- `zIndex` - Z-index layers

## Utilities

### classNames (`utils/classNames.ts`)

Utility for conditionally joining classNames:

```typescript
import { classNames, cn } from '../utils/classNames';

// Basic usage
className={classNames('foo', 'bar')} // => 'foo bar'

// Conditional classes
className={classNames('base', { 'active': isActive })} // => 'base active' if isActive

// Arrays
className={classNames(['a', 'b'], 'c')} // => 'a b c'
```

## Shared Components

### Button (`components/shared/Button.tsx`)

Standardized button component with variants:

```typescript
import { Button } from '../components/shared';

<Button variant="primary" size="base">Click me</Button>
<Button variant="secondary" size="sm" as="link" to="/path">Link Button</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'base' | 'lg'
- `as`: 'button' | 'link' (if link, provide `to` prop)

### Card (`components/shared/Card.tsx`)

Standardized card components:

```typescript
import { Card, CardHeader, CardContent } from '../components/shared';

<Card hoverable>
  <CardHeader>Header content</CardHeader>
  <CardContent>Body content</CardContent>
</Card>
```

## Usage Examples

### Refactoring a component to use constants

**Before:**
```tsx
<div className="text-2xl md:text-3xl font-bold text-white leading-tight">
  Title
</div>
```

**After:**
```tsx
import { typography } from '../constants';

<div className={classNames(
  typography.sizes.heading.sm,
  typography.weights.bold,
  typography.colors.primary,
  typography.lineHeights.tight
)}>
  Title
</div>
```

### Using pre-composed styles

**Even better:**
```tsx
import { textStyles } from '../constants';

<h2 className={textStyles.cardTitle}>Title</h2>
```

## Benefits of This Structure

1. **Consistency** - All typography and spacing uses the same constants
2. **Maintainability** - Change sizes in one place, update everywhere
3. **Type Safety** - TypeScript ensures correct usage
4. **Discoverability** - Easy to find available styles via autocomplete
5. **Reusability** - Shared components reduce code duplication
6. **Scalability** - Easy to add new constants or components

## Migration Guide

When refactoring existing components:

1. Import constants: `import { typography, ui } from '../constants'`
2. Replace hardcoded classes with constants
3. Use `classNames` utility for conditional classes
4. Consider using shared components (Button, Card) where applicable
5. Update text sizes to use typography constants

## Future Improvements

- [ ] Add more shared components (Input, Badge, etc.)
- [ ] Create theme constants for colors
- [ ] Add animation constants
- [ ] Create component variant utilities

