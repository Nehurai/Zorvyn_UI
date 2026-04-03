import { Transaction } from '../../lib/supabase';
import { PieChart } from 'lucide-react';

type SpendingBreakdownProps = {
  transactions: Transaction[];
};

const COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-orange-500',
];

export function SpendingBreakdown({ transactions }: SpendingBreakdownProps) {
  const expenses = transactions.filter(t => t.type === 'expense');

  const categoryData = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const total = sortedCategories.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Spending Breakdown
        </h2>
        <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>

      {sortedCategories.length === 0 ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No expense data available
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCategories.map(([category, amount], index) => {
            const percentage = (amount / total) * 100;

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${COLORS[index % COLORS.length]}`} />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {category}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">
                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${COLORS[index % COLORS.length]} transition-all rounded-full`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 w-12 text-right">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
