# Event Tracking App Design Guidelines

## Design Approach
**Selected System:** Fluent Design (Microsoft) - optimized for productivity applications and data-dense interfaces with clear hierarchy and efficient workflows.

**Key Principles:**
- Clarity over decoration: Information-first design
- Efficiency in data entry and navigation
- Consistent patterns across admin and data entry dashboards
- Scannable layouts optimized for frequent use

## Typography System
**Font Family:** Inter (Google Fonts)
- Headers: 600-700 weight
- Body: 400-500 weight
- Data/metrics: 500 weight, tabular numbers

**Scale:**
- Dashboard titles: text-3xl (30px)
- Section headers: text-xl (20px)
- Card titles: text-lg (18px)
- Body/forms: text-base (16px)
- Labels/metadata: text-sm (14px)
- Table data: text-sm (14px)

## Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card gaps: gap-4 to gap-6
- Form field spacing: space-y-4

**Container Strategy:**
- Dashboard shell: Full-width with fixed sidebar (w-64)
- Content area: max-w-7xl with px-6 to px-8
- Cards: Contained within grid systems
- Forms: max-w-2xl for optimal data entry

## Component Library

### Navigation
**Sidebar (Admin & Data Entry):**
- Fixed left sidebar (w-64) with app branding at top
- Grouped navigation items with icons (Heroicons)
- Active state with subtle background and border accent
- User profile/settings at bottom
- Collapsible on mobile (hamburger menu)

**Top Bar:**
- Breadcrumb navigation for context
- Search functionality (prominent, w-96)
- Notification bell icon
- User avatar dropdown (right-aligned)

### Dashboard Cards
**Metric Cards:**
- Clean white/surface background with subtle shadow
- Large number display (text-4xl, font-semibold)
- Label below (text-sm, muted)
- Optional trend indicator (icon + percentage)
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4

**Activity Feed Card:**
- Scrollable list with timeline design
- Each entry: timestamp, activity type icon, description
- Alternating subtle background for readability
- "View all" action at bottom

**Chart/Analytics Cards:**
- Padded container with header and actions
- Use chart libraries (Chart.js recommended)
- Legend positioned clearly
- Responsive aspect ratio

### Data Tables
**Structure:**
- Sticky header with sortable columns
- Alternating row backgrounds (subtle)
- Hover state on rows
- Row actions (edit, delete) on right, visible on hover
- Pagination at bottom (center-aligned)
- Checkbox column for bulk actions

**Features:**
- Search/filter bar above table
- Column visibility toggles
- Export button (CSV/Excel)
- Bulk action dropdown when items selected

### Forms (Data Entry Dashboard)
**Layout:**
- Single column for simplicity (max-w-2xl)
- Clear section groupings with dividers
- Label above input pattern
- Helper text below inputs
- Required field indicators (*)

**Input Components:**
- Text inputs: Standard height (h-10), rounded borders
- Textareas: For notes (min-h-32)
- Selects/dropdowns: Native-enhanced or custom styled
- Date/time pickers: Inline calendar component
- Tags input: Pill-based with add/remove
- Radio groups: Horizontal for 2-3 options, vertical for more
- File upload: Drag-and-drop zone with file preview

**Form Actions:**
- Primary button (right): "Save" or "Log Entry"
- Secondary button (left): "Cancel" or "Clear"
- Auto-save indicator when applicable

### Modals & Dialogs
- Centered overlay with backdrop blur
- Max width: max-w-lg to max-w-2xl based on content
- Header with title and close button
- Scrollable content area if needed
- Action buttons at bottom (right-aligned)

### Badges & Status Indicators
- Rounded pills for categories/tags
- Color-coded by category (assigned systematically)
- Status badges: Small dot + label pattern
- Count badges: Circle with number (notifications)

### Empty States
- Centered icon (large, muted)
- Descriptive message
- Clear call-to-action button
- Helpful guidance for first-time users

## Interaction Patterns

**Data Entry Flow:**
1. Quick-access "New Entry" button (fixed or prominent)
2. Form slides in or opens in modal/dedicated page
3. Real-time validation feedback
4. Success confirmation with option to add another
5. Return to dashboard with new entry visible

**Admin Dashboard Flow:**
1. Overview metrics immediately visible
2. Recent activity feed for quick scan
3. Filter/search to drill down
4. Click entry to view details (modal or side panel)
5. Edit/delete actions require confirmation

**Search & Filtering:**
- Global search in top bar (real-time suggestions)
- Advanced filters: Date range, category, activity type, tags
- Filter chips display active filters (removable)
- Clear all filters option

## Responsive Behavior
- Desktop (lg+): Full sidebar + multi-column grids
- Tablet (md): Collapsible sidebar + 2-column grids
- Mobile: Bottom navigation + single column stack

## Images
This application does not require hero images or decorative imagery. Focus on:
- Dashboard visualizations (charts, graphs)
- Icons for activities/categories (Heroicons library)
- User avatars (circular, consistent sizing)
- Empty state illustrations (minimal, functional)

## Performance Considerations
- Paginated tables for large datasets
- Lazy loading for activity feeds
- Optimistic UI updates for better perceived performance
- Loading skeletons for async data