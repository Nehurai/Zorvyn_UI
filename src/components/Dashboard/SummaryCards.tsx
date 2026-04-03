import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Transaction } from '../../lib/supabase';

type SummaryCardsProps = {
  transactions: Transaction[];
};

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      icon: Wallet,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      color: 'bg-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.textColor}`} />
            </div>
            <DollarSign className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {card.title}
          </h3>
          <p className={`text-3xl font-bold ${card.textColor}`}>
            ${card.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      ))}
    </div>
  );
}
