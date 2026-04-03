# Seed Data Instructions

This document provides sample SQL queries to populate your Finance Dashboard with demo data for testing and demonstration purposes.

## Important Notes

- Replace `YOUR_USER_ID` with your actual user ID from the `profiles` table
- You can run these queries in the Supabase SQL Editor
- These are sample transactions spanning the last 6 months
- Feel free to modify amounts, categories, and dates as needed

## Get Your User ID

First, get your user ID by running:

```sql
SELECT id, email FROM profiles WHERE email = 'your-email@example.com';
```

## Sample Transaction Data

```sql
-- Replace YOUR_USER_ID with your actual user ID
INSERT INTO transactions (user_id, date, amount, category, type, description) VALUES
-- January 2026
('YOUR_USER_ID', '2026-01-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2026-01-08', 150.50, 'Food & Dining', 'expense', 'Grocery shopping'),
('YOUR_USER_ID', '2026-01-10', 45.00, 'Transportation', 'expense', 'Gas'),
('YOUR_USER_ID', '2026-01-15', 89.99, 'Entertainment', 'expense', 'Movie subscription'),
('YOUR_USER_ID', '2026-01-20', 1200.00, 'Bills & Utilities', 'expense', 'Rent'),
('YOUR_USER_ID', '2026-01-22', 75.30, 'Food & Dining', 'expense', 'Restaurant dinner'),
('YOUR_USER_ID', '2026-01-25', 200.00, 'Shopping', 'expense', 'Clothing'),

-- February 2026
('YOUR_USER_ID', '2026-02-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2026-02-07', 500.00, 'Freelance', 'income', 'Freelance project'),
('YOUR_USER_ID', '2026-02-10', 165.75, 'Food & Dining', 'expense', 'Grocery shopping'),
('YOUR_USER_ID', '2026-02-12', 50.00, 'Transportation', 'expense', 'Gas'),
('YOUR_USER_ID', '2026-02-14', 120.00, 'Entertainment', 'expense', 'Concert tickets'),
('YOUR_USER_ID', '2026-02-20', 1200.00, 'Bills & Utilities', 'expense', 'Rent'),
('YOUR_USER_ID', '2026-02-25', 85.50, 'Healthcare', 'expense', 'Pharmacy'),

-- March 2026
('YOUR_USER_ID', '2026-03-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2026-03-08', 180.20, 'Food & Dining', 'expense', 'Grocery shopping'),
('YOUR_USER_ID', '2026-03-10', 55.00, 'Transportation', 'expense', 'Gas and parking'),
('YOUR_USER_ID', '2026-03-15', 350.00, 'Shopping', 'expense', 'Electronics'),
('YOUR_USER_ID', '2026-03-18', 95.00, 'Entertainment', 'expense', 'Gaming subscription'),
('YOUR_USER_ID', '2026-03-20', 1200.00, 'Bills & Utilities', 'expense', 'Rent'),
('YOUR_USER_ID', '2026-03-28', 125.00, 'Food & Dining', 'expense', 'Restaurant'),
('YOUR_USER_ID', '2026-03-30', 1000.00, 'Investment', 'income', 'Dividend payment'),

-- April 2026 (Current month - partial data)
('YOUR_USER_ID', '2026-04-01', 200.00, 'Food & Dining', 'expense', 'Grocery shopping'),
('YOUR_USER_ID', '2026-04-02', 45.00, 'Transportation', 'expense', 'Gas');
```

## Alternative: Realistic 6-Month Dataset

For a more comprehensive dataset:

```sql
-- Income transactions (monthly salary + occasional freelance)
INSERT INTO transactions (user_id, date, amount, category, type, description) VALUES
-- Salary entries for 6 months
('YOUR_USER_ID', '2025-10-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2025-11-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2025-12-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2026-01-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2026-02-05', 5000.00, 'Salary', 'income', 'Monthly salary'),
('YOUR_USER_ID', '2026-03-05', 5000.00, 'Salary', 'income', 'Monthly salary'),

-- Occasional freelance income
('YOUR_USER_ID', '2025-11-15', 750.00, 'Freelance', 'income', 'Web design project'),
('YOUR_USER_ID', '2026-01-20', 600.00, 'Freelance', 'income', 'Consulting work'),
('YOUR_USER_ID', '2026-03-10', 1200.00, 'Freelance', 'income', 'Mobile app development'),

-- Investment income
('YOUR_USER_ID', '2025-12-31', 500.00, 'Investment', 'income', 'Stock dividends'),
('YOUR_USER_ID', '2026-03-31', 650.00, 'Investment', 'income', 'Stock dividends');

-- Regular monthly expenses
INSERT INTO transactions (user_id, date, amount, category, type, description) VALUES
-- Rent (every 20th)
('YOUR_USER_ID', '2025-10-20', 1200.00, 'Bills & Utilities', 'expense', 'Monthly rent'),
('YOUR_USER_ID', '2025-11-20', 1200.00, 'Bills & Utilities', 'expense', 'Monthly rent'),
('YOUR_USER_ID', '2025-12-20', 1200.00, 'Bills & Utilities', 'expense', 'Monthly rent'),
('YOUR_USER_ID', '2026-01-20', 1200.00, 'Bills & Utilities', 'expense', 'Monthly rent'),
('YOUR_USER_ID', '2026-02-20', 1200.00, 'Bills & Utilities', 'expense', 'Monthly rent'),
('YOUR_USER_ID', '2026-03-20', 1200.00, 'Bills & Utilities', 'expense', 'Monthly rent'),

-- Groceries (weekly)
('YOUR_USER_ID', '2025-10-05', 145.50, 'Food & Dining', 'expense', 'Weekly groceries'),
('YOUR_USER_ID', '2025-10-12', 132.75, 'Food & Dining', 'expense', 'Weekly groceries'),
('YOUR_USER_ID', '2025-10-19', 156.20, 'Food & Dining', 'expense', 'Weekly groceries'),
('YOUR_USER_ID', '2025-10-26', 141.90, 'Food & Dining', 'expense', 'Weekly groceries'),

-- Transportation (bi-weekly gas)
('YOUR_USER_ID', '2025-10-10', 45.00, 'Transportation', 'expense', 'Gas'),
('YOUR_USER_ID', '2025-10-24', 48.50, 'Transportation', 'expense', 'Gas'),
('YOUR_USER_ID', '2025-11-07', 42.00, 'Transportation', 'expense', 'Gas'),
('YOUR_USER_ID', '2025-11-21', 50.00, 'Transportation', 'expense', 'Gas'),

-- Entertainment & subscriptions
('YOUR_USER_ID', '2025-10-01', 15.99, 'Entertainment', 'expense', 'Netflix'),
('YOUR_USER_ID', '2025-11-01', 15.99, 'Entertainment', 'expense', 'Netflix'),
('YOUR_USER_ID', '2025-12-01', 15.99, 'Entertainment', 'expense', 'Netflix'),
('YOUR_USER_ID', '2026-01-01', 15.99, 'Entertainment', 'expense', 'Netflix'),
('YOUR_USER_ID', '2026-02-01', 15.99, 'Entertainment', 'expense', 'Netflix'),
('YOUR_USER_ID', '2026-03-01', 15.99, 'Entertainment', 'expense', 'Netflix'),

-- Shopping (occasional)
('YOUR_USER_ID', '2025-10-15', 199.99, 'Shopping', 'expense', 'New shoes'),
('YOUR_USER_ID', '2025-11-25', 450.00, 'Shopping', 'expense', 'Black Friday electronics'),
('YOUR_USER_ID', '2025-12-15', 320.00, 'Shopping', 'expense', 'Holiday gifts'),
('YOUR_USER_ID', '2026-01-08', 125.00, 'Shopping', 'expense', 'Winter jacket'),
('YOUR_USER_ID', '2026-02-14', 89.99, 'Shopping', 'expense', 'Valentines gift'),

-- Healthcare
('YOUR_USER_ID', '2025-11-10', 45.00, 'Healthcare', 'expense', 'Doctor visit copay'),
('YOUR_USER_ID', '2025-11-12', 32.50, 'Healthcare', 'expense', 'Prescription'),
('YOUR_USER_ID', '2026-02-18', 75.00, 'Healthcare', 'expense', 'Dental cleaning'),

-- Education
('YOUR_USER_ID', '2025-10-01', 49.99, 'Education', 'expense', 'Online course'),
('YOUR_USER_ID', '2026-01-15', 35.00, 'Education', 'expense', 'Technical book');
```

## Quick Test with Minimal Data

If you just want to test the features quickly:

```sql
INSERT INTO transactions (user_id, date, amount, category, type, description) VALUES
('YOUR_USER_ID', CURRENT_DATE - INTERVAL '5 days', 3000.00, 'Salary', 'income', 'Salary payment'),
('YOUR_USER_ID', CURRENT_DATE - INTERVAL '4 days', 150.00, 'Food & Dining', 'expense', 'Groceries'),
('YOUR_USER_ID', CURRENT_DATE - INTERVAL '3 days', 45.00, 'Transportation', 'expense', 'Gas'),
('YOUR_USER_ID', CURRENT_DATE - INTERVAL '2 days', 200.00, 'Shopping', 'expense', 'Clothing'),
('YOUR_USER_ID', CURRENT_DATE - INTERVAL '1 day', 75.50, 'Food & Dining', 'expense', 'Restaurant');
```

## Verify Data

After inserting, verify the data was added:

```sql
SELECT
  date,
  type,
  category,
  amount,
  description
FROM transactions
WHERE user_id = 'YOUR_USER_ID'
ORDER BY date DESC;
```

## Clear All Data

If you want to start fresh:

```sql
-- WARNING: This will delete all your transactions!
DELETE FROM transactions WHERE user_id = 'YOUR_USER_ID';
```

## Notes

- All amounts are in USD
- Dates are in YYYY-MM-DD format
- Categories match the predefined list in the application
- You can add more transactions using the UI after signing in as an admin