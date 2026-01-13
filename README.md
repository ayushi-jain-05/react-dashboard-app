# React Dashboard App

A responsive React dashboard application with Dashboard and Profile pages featuring full interactivity.

## Tech Stack

- **React** (v16.14.0) - Functional Components with Hooks
- **JavaScript** (ES6+)
- **Chakra UI** (v1.8.8) - Component library for styling
- **React Router DOM** (v5.2.1) - Client-side routing
- **ApexCharts** - Data visualization charts
- **Framer Motion** - Animations

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser at http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── assets/           # Images and SVG icons
├── components/       # Reusable UI components
│   ├── Card/         # Card components
│   ├── Charts/       # Bar and Line charts
│   ├── Footer/       # Page footer
│   ├── Icons/        # Custom icon components
│   ├── Layout/       # Layout wrapper components
│   ├── Modal/        # Reusable modal components
│   ├── Navbars/      # Navigation bars
│   ├── Separator/    # Visual divider
│   ├── Sidebar/      # Sidebar navigation
│   └── Tables/       # Table row components
├── data/             # Mock data and chart configs
├── layouts/          # Page layout templates
├── pages/            # Page components
│   ├── Dashboard/    # Main dashboard page
│   └── Profile/      # User profile page
├── theme/            # Chakra UI theme configuration
├── index.js          # App entry point
└── routes.js         # Route configuration
```

## Features

### Dashboard Page (`/admin/dashboard`)
- Statistics Cards with key metrics
- Interactive Bar Chart (Active Users)
- Interactive Line Chart (Sales Overview)
- Projects Table with progress indicators
- Orders Timeline

### Profile Page (`/admin/profile`)
- Profile Header with tab navigation
- Platform Settings with toggle switches
- Conversations list with Reply modal
- Projects section with Create/View modals

## React Hooks Usage

| Hook | Usage |
|------|-------|
| `useState` | Component state management |
| `useEffect` | Side effects, data loading, event listeners |
| `useCallback` | Memoized event handlers |
| `useMemo` | Memoized computed values |
| `useDisclosure` | Modal open/close state (Chakra UI) |
| `useToast` | Notification feedback (Chakra UI) |
| `useHistory` | Programmatic navigation |

## Assumptions

### General
1. Data is mocked using static arrays (no backend required)
2. Form submissions trigger toast notifications (no API calls)
3. Sidebar items Tables, Billing, RTL redirect to Dashboard page
4. Only Dashboard and Profile pages are fully functional
5. All interactive elements (toggles, buttons, modals) are working

### Navbar (Header)
6. **Navbar icons functionality** (not specified in Figma, implemented based on interactive appearance):
   - Bell icon: Opens notifications dropdown with mock notifications (marks as read on click)
   - Settings icon: Opens settings modal with toggle preferences
   - Sign In button: Navigates to Profile page
   - Search input: UI only (no search functionality implemented)

### Profile Page
7. **Profile Header Tabs** (Overview, Teams, Projects): Switch active state visually; content sections remain static as the design shows the same layout for all tabs
8. **Platform Settings**: All toggle switches are functional with toast notifications on state change
9. **Conversations Section**:
   - "REPLY" button opens a modal with the conversation context
   - Reply submission shows success toast (no actual message sending)
   - Conversations list uses mock data with placeholder avatars
10. **Projects Section**:
    - "VIEW ALL" button opens a modal with project details
    - "Create a New Project" button opens a form modal
    - New projects are added to the list dynamically (state-managed)
    - Project avatars are placeholder images
11. **Profile Avatar Edit Icon**: Visible but no file upload functionality (decorative)

### Dashboard Page
12. **Statistics Cards**: Display static mock data
13. **Charts**: Interactive ApexCharts with hover tooltips
14. **Projects Table**: Rendered dynamically from mock data array
15. **Orders Timeline**: Rendered dynamically from mock data array
16. **"Read more" link**: Opens a modal with additional information

## Responsive Design

- **Desktop**: Full sidebar with multi-column layouts
- **Tablet**: Collapsible sidebar with 2-column grids
- **Mobile**: Hamburger menu with single-column stacking