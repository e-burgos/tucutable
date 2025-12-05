# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-02

### Added

- **Initial stable release** of Tucutable data table component
- Complete TypeScript type definitions for all components and props
- Comprehensive Storybook documentation with interactive examples
- Full Tailwind CSS v4 integration with custom theme variables
- Dark and light theme support with automatic switching
- State persistence using Zustand with localStorage
- Advanced column management features:
  - Column visibility toggle
  - Column reordering via drag & drop (@dnd-kit)
  - Column resizing with min/max constraints
  - Column pinning (left/right)
- Row features:
  - Row selection (checkbox/radio)
  - Row actions menu with customizable actions
  - Expandable rows with sub-components
  - Nested data tables support
- Sorting capabilities:
  - Single and multi-column sorting
  - Manual sorting for server-side data
  - Persistent sort state
- Pagination options:
  - Client-side pagination
  - Server-side pagination
  - Manual pagination with custom controls
- Filtering and search:
  - Column-level filtering
  - Global search functionality
- Export functionality:
  - Export cell values with numeric/percentage formatting
  - Export headers with proper formatting
- Accessibility features:
  - ARIA labels and roles
  - Keyboard navigation support
  - WCAG 2.1 AA compliant
- Performance optimizations:
  - React.memo for component memoization
  - useMemo for expensive calculations
  - Efficient re-rendering strategies
- Customizable styling system:
  - CSS variables for theming
  - Custom styles via sx prop
  - Responsive design with mobile-first approach
- Tooltip component with smart positioning
- Loading and error states with custom messages
- Empty state handling with customizable messages

### Fixed

- Tooltip positioning issues - now correctly calculates position after DOM render
- State update during render warnings - deferred updates using queueMicrotask
- Maximum update depth exceeded errors - optimized useEffect dependencies
- Portal rendering type errors - fixed ReactPortal type compatibility
- Column drag and drop positioning accuracy
- Scroll position preservation during state updates

## [0.9.0] - 2024-11-15

### Added

- Server-side pagination support with total count tracking
- Manual pagination component for custom pagination controls
- Enhanced row actions with conditional visibility
- Sub-component rendering support for expandable rows
- Nested data tables functionality
- Export functionality for table data
- Custom state messages for empty/error states
- Contact support link in error states

### Changed

- Improved column pinning behavior
- Enhanced drag and drop performance
- Optimized state persistence mechanism
- Better handling of large datasets

### Fixed

- Memory leaks in event listeners
- Scroll position issues in scrollable containers
- Column resize edge cases
- State synchronization between multiple table instances

## [0.8.0] - 2024-10-20

### Added

- Column drag and drop reordering using @dnd-kit
- Column resizing with constraints
- Column visibility toggle in header menu
- Enhanced header options configuration
- Row hover effects
- Improved keyboard navigation
- Focus management for accessibility

### Changed

- Refactored column management system
- Improved header component architecture
- Enhanced state management with Zustand
- Better separation of concerns in context providers

### Fixed

- Column order persistence issues
- Header menu positioning
- Keyboard navigation bugs
- Focus trap issues

## [0.7.0] - 2024-09-10

### Added

- Row selection functionality (checkbox and radio)
- Row actions menu with customizable actions
- Expandable rows support
- Sub-component rendering capability
- Enhanced row hover states
- Row click handlers
- Custom row styling options

### Changed

- Improved row rendering performance
- Optimized cell rendering with memoization
- Better handling of row state updates

### Fixed

- Row selection state persistence
- Row actions menu positioning
- Expandable row animation issues

## [0.6.0] - 2024-08-05

### Added

- Multi-column sorting support
- Manual sorting for server-side data
- Sort state persistence
- Sort indicators in column headers
- Custom sort comparators
- Sort change callbacks

### Changed

- Improved sorting performance
- Better sort state management
- Enhanced sort UI indicators

### Fixed

- Sort state synchronization
- Sort persistence across page reloads
- Sort indicator display issues

## [0.5.0] - 2024-07-15

### Added

- Pagination component with page size selector
- Client-side pagination
- Pagination state persistence
- Rows info display
- Custom pagination controls
- Pagination callbacks

### Changed

- Improved pagination performance
- Better pagination state management
- Enhanced pagination UI

### Fixed

- Pagination state persistence issues
- Page size change handling
- Pagination edge cases

## [0.4.0] - 2024-06-20

### Added

- Column filtering functionality
- Global search capability
- Filter state persistence
- Custom filter components
- Filter indicators
- Filter change callbacks

### Changed

- Improved filtering performance
- Better filter state management
- Enhanced filter UI

### Fixed

- Filter state synchronization
- Filter persistence issues
- Filter indicator display

## [0.3.0] - 2024-05-10

### Added

- Tailwind CSS v4 integration
- Custom CSS variables for theming
- Dark and light theme support
- Theme switching functionality
- Custom color palette support
- Responsive design improvements
- Mobile-first approach

### Changed

- Complete styling system overhaul
- Migrated from CSS modules to Tailwind utilities
- Improved theme consistency
- Better color system architecture

### Fixed

- Theme switching issues
- Color variable conflicts
- Responsive layout bugs

## [0.2.0] - 2024-04-05

### Added

- Zustand state management integration
- State persistence with localStorage
- Store management hooks
- State reset functionality
- Multiple table instance support
- State isolation per table ID

### Changed

- Refactored state management architecture
- Improved state persistence mechanism
- Better state synchronization

### Fixed

- State persistence edge cases
- Multiple instance conflicts
- State reset issues

## [0.1.0] - 2024-03-01

### Added

- Initial release of Tucutable
- Basic table rendering with TanStack Table
- Column definitions support
- Data rendering
- Basic styling
- TypeScript support
- React 18+ compatibility
- Core table structure
- Table wrapper component
- Basic cell rendering
- Header rendering

### Changed

- Project structure established
- Development environment setup
- Build configuration

---

## Version History Summary

- **1.0.0** (Dec 2024) - Stable release with all core features
- **0.9.0** (Nov 2024) - Server pagination, nested tables, export
- **0.8.0** (Oct 2024) - Column drag & drop, resizing, visibility
- **0.7.0** (Sep 2024) - Row selection, actions, expandable rows
- **0.6.0** (Aug 2024) - Multi-column sorting, manual sorting
- **0.5.0** (Jul 2024) - Pagination system
- **0.4.0** (Jun 2024) - Filtering and search
- **0.3.0** (May 2024) - Tailwind CSS v4, theming system
- **0.2.0** (Apr 2024) - Zustand state management
- **0.1.0** (Mar 2024) - Initial release

---

## Migration Guides

### From 0.9.x to 1.0.0

No breaking changes. All APIs remain compatible.

### From 0.8.x to 0.9.0

No breaking changes. All APIs remain compatible.

### From 0.7.x to 0.8.0

- Column management APIs have been enhanced but remain backward compatible.

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
