# Finance Dashboard

A modern, full-featured finance dashboard application built with React, TypeScript, and Supabase. This project demonstrates comprehensive financial tracking with role-based access control, real-time data visualization, and a beautiful dark mode interface.

## Features

### Dashboard Overview
- **Summary Cards**: Display total balance, income, and expenses with color-coded visual indicators
- **Balance Trend Visualization**: Time-based chart showing monthly income vs expense trends over the last 6 months
- **Spending Breakdown**: Categorical pie chart visualization showing expense distribution across different categories
- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices

### Transactions Management
- **Transaction List**: Comprehensive table view of all financial transactions
- **Advanced Filtering**: Filter transactions by type (income/expense) with real-time search
- **Multi-column Sorting**: Sort by date, amount, or category with ascending/descending order
- **Add Transactions**: Admin users can add new transactions with detailed information

### Role-Based Access Control (RBAC)
- **Admin Role**: Full access to view, create, and manage transactions
- **Viewer Role**: Read-only access to view dashboard and transactions
- **Role Switching**: Easy toggle between roles for demonstration purposes
- **Secure RLS Policies**: Database-level security enforced through Supabase Row Level Security

### Insights & Analytics
- **Highest Spending Category**: Identifies and highlights top expense categories
- **Monthly Comparison**: Shows percentage change in spending compared to previous month
- **Average Daily Spending**: Calculates and displays daily spending patterns
- **Smart Observations**: Provides actionable insights based on financial data

### User Experience
- **Dark Mode**: System-wide dark mode with smooth transitions and persistent preferences
- **Authentication**: Secure email/password authentication with Supabase Auth
- **Loading States**: Elegant loading indicators for better user feedback
- **Empty States**: Graceful handling of empty data scenarios
- **Error Handling**: Comprehensive error messages and validation

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, consistent icon library
- **Vite**: Fast build tool and development server

### Backend & Database
- **Supabase**: Backend-as-a-Service providing:
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions
  - RESTful API

### Architecture
- **Context API**: State management for authentication and theme
- **Custom Hooks**: Reusable logic for auth and theme management
- **Component-based**: Modular, maintainable component structure
- **Type-safe**: Full TypeScript coverage with strict mode enabled

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── AuthPage.tsx           # Login and signup interface
│   ├── Dashboard/
│   │   ├── SummaryCards.tsx       # Financial summary cards
│   │   ├── BalanceTrend.tsx       # Monthly trend visualization
│   │   └── SpendingBreakdown.tsx  # Category breakdown chart
│   ├── Insights/
│   │   └── InsightsSection.tsx    # Financial insights and analytics
│   ├── Layout/
│   │   ├── DashboardLayout.tsx    # Main layout wrapper
│   │   └── Navbar.tsx             # Navigation with role switcher
│   └── Transactions/
│       ├── TransactionsList.tsx   # Transaction table with filters
│       └── AddTransactionModal.tsx # Transaction creation form
├── contexts/
│   ├── AuthContext.tsx            # Authentication state management
│   └── ThemeContext.tsx           # Dark mode state management
├── lib/
│   └── supabase.ts                # Supabase client configuration
├── pages/
│   └── Dashboard.tsx              # Main dashboard page
├── App.tsx                        # Root application component
└── main.tsx                       # Application entry point
```

## Database Schema

### Tables

**profiles**
- `id` (uuid, primary key) - References auth.users
- `email` (text) - User email address
- `role` (text) - User role: 'admin' or 'viewer'
- `created_at` (timestamptz) - Account creation timestamp

**transactions**
- `id` (uuid, primary key) - Unique transaction identifier
- `user_id` (uuid) - References profiles.id
- `date` (date) - Transaction date
- `amount` (decimal) - Transaction amount
- `category` (text) - Transaction category
- `type` (text) - 'income' or 'expense'
- `description` (text) - Optional transaction description
- `created_at` (timestamptz) - Record creation timestamp
- `updated_at` (timestamptz) - Record update timestamp

### Security

All tables use Row Level Security (RLS) with the following policies:

**Profiles**:
- Users can read and update their own profile

**Transactions**:
- All users can view their own transactions
- Admin users can create, update, and delete their own transactions
- Viewer users have read-only access

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   The `.env` file should already contain your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Database Setup**

   The database schema has been automatically created with migrations including:
   - Tables for profiles and transactions
   - Row Level Security policies
   - Indexes for optimized queries
   - Triggers for automatic timestamp updates

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Usage Guide

### Getting Started

1. **Sign Up**: Create a new account using email and password
2. **Default Role**: New users are automatically assigned the 'admin' role
3. **Add Transactions**: Click "Add Transaction" to create income or expense entries
4. **Switch Roles**: Use the role dropdown in the navbar to toggle between admin and viewer modes
5. **Explore Features**: Filter, sort, and analyze your financial data

### Role Comparison

| Feature | Admin | Viewer |
|---------|-------|--------|
| View Dashboard | ✓ | ✓ |
| View Transactions | ✓ | ✓ |
| Add Transactions | ✓ | ✗ |
| Edit Transactions | ✓ | ✗ |
| Delete Transactions | ✓ | ✗ |
| View Insights | ✓ | ✓ |
| Switch Role | ✓ | ✓ |

### Categories

The application supports the following transaction categories:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Salary
- Freelance
- Investment
- Gift
- Other

## Implementation Approach

### Design Philosophy
- **User-First**: Clean, intuitive interface designed for ease of use
- **Performance**: Optimized rendering and efficient state management
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Maintainability**: Well-structured, documented, and type-safe code

### State Management Strategy
- **Authentication State**: Managed through AuthContext with Supabase session handling
- **Theme State**: Persisted in localStorage and managed through ThemeContext
- **Transaction Data**: Fetched on-demand with local state caching

### Data Visualization
- **Custom SVG Charts**: Hand-crafted visualizations for better control and performance
- **Progressive Enhancement**: Charts degrade gracefully with empty data states
- **Color Coding**: Consistent color scheme (green for income, red for expenses, blue for balance)

### Security Considerations
- **Client-side Validation**: Immediate feedback on form inputs
- **Server-side Security**: RLS policies enforce access control at database level
- **Type Safety**: TypeScript prevents runtime errors and data inconsistencies
- **Authentication Flow**: Secure session management with automatic token refresh

## Technical Highlights

### Code Quality
- **TypeScript Strict Mode**: Full type coverage with no implicit any
- **Component Modularity**: Single Responsibility Principle throughout
- **Reusable Hooks**: Custom hooks for authentication and theme management
- **Error Boundaries**: Graceful error handling and user feedback

### Performance Optimizations
- **Memoization**: useMemo for expensive computations in visualizations
- **Efficient Sorting**: Client-side sorting and filtering for instant feedback
- **Code Splitting**: Vite's automatic code splitting for optimal bundle size
- **Database Indexing**: Strategic indexes on frequently queried columns

### User Experience Details
- **Smooth Transitions**: CSS transitions for theme switching and hover states
- **Loading States**: Skeleton screens and spinners for async operations
- **Form Validation**: Real-time validation with clear error messages
- **Responsive Tables**: Mobile-friendly table layouts with horizontal scrolling

## Future Enhancements

Potential improvements that could be added:
- **Export Functionality**: CSV/JSON export for transactions
- **Budget Goals**: Set and track monthly budget targets
- **Recurring Transactions**: Support for automated recurring entries
- **Multi-currency**: Support for different currencies with conversion
- **Advanced Charts**: Interactive charts with drill-down capabilities
- **Mobile App**: React Native version for mobile platforms
- **Notifications**: Email alerts for unusual spending patterns
- **Data Import**: CSV import for bulk transaction creation

## Testing Approach

For a production deployment, recommended testing strategy:
- **Unit Tests**: Jest for business logic and utility functions
- **Component Tests**: React Testing Library for UI components
- **Integration Tests**: Cypress for end-to-end user flows
- **Accessibility Tests**: axe-core for WCAG compliance

## License

This project was created as an assignment submission and is available for educational purposes.

## Acknowledgments

Built with modern web technologies and best practices for the Frontend Developer Intern position assignment.