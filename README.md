# Mini Seller Console

A lightweight React application for triaging leads and converting them into opportunities. Built with modern web technologies and designed for optimal user experience in sales pipeline management.

## 🚀 Features

### Core Functionality (MVP)

#### 📋 Leads Management
- **Leads List**: Display comprehensive lead information from local JSON data
- **Lead Fields**: ID, name, company, email, source, score, and status tracking
- **Search & Filter**: Real-time search by name/company and filter by status
- **Sorting**: Sort leads by score (descending) and other criteria
- **Responsive Design**: Optimized for both desktop and mobile devices

#### 🔍 Lead Detail Panel
- **Slide-over Panel**: Click any lead row to open detailed view
- **Inline Editing**: Edit lead status and email with real-time validation
- **Email Validation**: Built-in email format validation
- **Save/Cancel Actions**: Robust error handling with user feedback

#### 🎯 Lead Conversion
- **Convert to Opportunity**: One-click lead conversion functionality
- **Opportunity Creation**: Auto-generates opportunities with ID, name, stage, amount, and account name
- **Opportunities Table**: Clean display of all converted opportunities

#### 🔄 Advanced UX Features
- **Loading States**: Skeleton loaders for smooth user experience
- **Empty States**: Helpful messaging when no data is available
- **Error Handling**: Comprehensive error states with user-friendly messages
- **Optimistic Updates**: Instant UI updates with rollback on failure
- **Performance**: Handles 100+ leads smoothly

### Enhanced Features

#### 💾 Data Persistence
- **Filter Persistence**: Search and filter preferences saved to localStorage
- **Tab State**: Active tab selection persists across sessions
- **Form State**: Maintains user input during navigation

#### 🔄 Optimistic Behavior
- **Instant Feedback**: UI updates immediately for better UX
- **Error Recovery**: Automatic rollback on API failures
- **20% Simulated Failure Rate**: Demonstrates robust error handling

#### 📱 Responsive Layout
- **Mobile-First Design**: Optimized for mobile devices
- **Adaptive Components**: Seamless desktop to mobile experience
- **Touch-Friendly**: Mobile-optimized interactions

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS 4.x for utility-first styling
- **UI Components**: Shadcn/UI for consistent, accessible components
- **State Management**: TanStack Query for server state and caching
- **Form Validation**: React Hook Form with Zod schema validation
- **Routing**: React Router for navigation
- **Icons**: Lucide React for consistent iconography
- **Notifications**: Sonner for toast notifications
- **Theming**: Next-themes for dark/light mode support

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── mocks/             # Mock data for local development
│   └── requests/          # API request functions
├── components/            # React components
│   ├── lead/             # Lead-specific components
│   ├── opportunities/     # Opportunity components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── config/               # Configuration files
└── styles/               # Global styles
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Bun (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd mini-seller-console
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `bun dev` - Start development server 
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun lint` - Run ESLint

## 💡 Design Decisions

### UI/UX Architecture
**Tab-based Layout**: For clarity, I separated Leads and Opportunities into two tabs. This keeps the layout clean while meeting all requirements and provides a better user experience than a split-screen approach.

**Hidden IDs**: Lead and opportunity IDs are hidden from the table display to provide a cleaner interface while maintaining data integrity in the background.

### Technical Choices

**Shadcn/UI**: Selected for its excellent accessibility, TypeScript support, and customizable components that maintain design consistency.

**TanStack Query**: Implemented for robust data persistence, optimistic updates, and caching capabilities. This provides excellent UX even with simulated network latency.

**No Pagination**: Due to the absence of a backend API, pagination was not implemented. The current solution efficiently handles the specified ~100 leads requirement through client-side filtering and virtualization.

### Error Simulation
**20% Failure Rate**: Implemented in the conversion API to demonstrate optimistic updates and error recovery mechanisms in a realistic scenario.

## 🔧 Configuration

The application uses local JSON files for data simulation and includes:
- Comprehensive mock data with 100+ leads
- Simulated API latency (500ms)
- Configurable error rates for testing
- Persistent user preferences

## 📱 Responsive Features

- **Mobile Navigation**: Touch-friendly tab switching
- **Adaptive Tables**: Responsive table layouts for small screens
- **Optimized Forms**: Mobile-optimized form inputs and buttons
- **Gesture Support**: Swipe gestures for better mobile experience

## 🎨 Theming

The application supports both light and dark themes with:
- System preference detection
- Manual theme switching
- Persistent theme selection
- Consistent color schemes across all components

## 🧪 Testing Scenarios

- **Large Dataset**: Test with 100+ leads for performance validation
- **Network Errors**: 20% simulated failure rate for error handling
- **Form Validation**: Email format and required field validation
- **State Persistence**: Filter and search state across page refreshes
- **Responsive Behavior**: Test across different screen sizes

## 📋 Requirements Checklist

### ✅ MVP Requirements
- [x] Leads list with search, filter, and sort functionality
- [x] Lead detail panel with inline editing
- [x] Lead to opportunity conversion
- [x] Opportunities display table
- [x] Loading, empty, and error states
- [x] Smooth handling of 100+ leads

### ✅ Nice-to-Have Features
- [x] Filter/sort persistence in localStorage
- [x] Optimistic updates with rollback capability
- [x] Fully responsive layout (desktop → mobile)

### ✅ Technical Constraints
- [x] React + Vite + Tailwind CSS
- [x] No backend dependency
- [x] Local JSON data with simulated latency

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

