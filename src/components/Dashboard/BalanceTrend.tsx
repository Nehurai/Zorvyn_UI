import { Transaction } from '../../lib/supabase';
import { TrendingUp } from 'lucide-react';

type BalanceTrendProps = {
  transactions: Transaction[];
};

export function BalanceTrend({ transactions }: BalanceTrendProps) {
  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expense: 0 };
    }

    if (t.type === 'income') {
      acc[monthKey].income += Number(t.amount);
    } else {
      acc[monthKey].expense += Number(t.amount);
    }

    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const sortedMonths = Object.keys(monthlyData).sort().slice(-6);
  const maxValue = Math.max(
    ...sortedMonths.map(m => Math.max(monthlyData[m].income, monthlyData[m].expense))
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Balance Trend
        </h2>
        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>

      {sortedMonths.length === 0 ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No transaction data available
        </div>
      ) : (
        <div className="space-y-4">
          {sortedMonths.map((month) => {
            const data = monthlyData[month];
            const balance = data.income - data.expense;
            const [year, monthNum] = month.split('-');
            const monthName = new Date(Number(year), Number(monthNum) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            return (
              <div key={month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {monthName}
                  </span>
                  <span className={`font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(data.income / maxValue) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${(data.expense / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Income: ${data.income.toFixed(2)}</span>
                  <span>Expense: ${data.expense.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
