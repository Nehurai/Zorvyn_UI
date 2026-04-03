import { Transaction } from '../../lib/supabase';
import { Lightbulb, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

type InsightsSectionProps = {
  transactions: Transaction[];
};

export function InsightsSection({ transactions }: InsightsSectionProps) {
  const expenses = transactions.filter(t => t.type === 'expense');

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)[0];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthExpenses = expenses
    .filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const lastMonthExpenses = expenses
    .filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthlyChange = lastMonthExpenses > 0
    ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
    : 0;

  const averageDailySpending = expenses.length > 0
    ? expenses.reduce((sum, t) => sum + Number(t.amount), 0) / 30
    : 0;

  const insights = [
    {
      icon: TrendingUp,
      title: 'Highest Spending Category',
      description: highestCategory
        ? `${highestCategory[0]} accounts for $${highestCategory[1].toFixed(2)} of your expenses`
        : 'No expense data available yet',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Calendar,
      title: 'Monthly Comparison',
      description: monthlyChange !== 0
        ? `You're spending ${Math.abs(monthlyChange).toFixed(1)}% ${monthlyChange > 0 ? 'more' : 'less'} than last month`
        : 'No change from last month',
      color: monthlyChange > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400',
      bgColor: monthlyChange > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: TrendingDown,
      title: 'Average Daily Spending',
      description: `Your average daily spending is $${averageDailySpending.toFixed(2)}`,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Insights
        </h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${insight.bgColor} border border-slate-200 dark:border-slate-700`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-white dark:bg-slate-800`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${insight.color} mb-1`}>
                  {insight.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
